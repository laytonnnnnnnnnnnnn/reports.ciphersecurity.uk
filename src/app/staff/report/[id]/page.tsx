'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  ArrowLeft, 
  Clock, 
  User, 
  FileText, 
  Calendar,
  AlertTriangle,
  Loader,
  Save
} from 'lucide-react'
import { ReportType, ReportStatus, UrgencyLevel } from '@prisma/client'
import { formatReportType, formatUrgencyLevel } from '@/lib/utils'

interface ReportUpdate {
  id: string
  action: string
  details?: string
  createdAt: string
  staff: {
    id: string
    username: string
  }
}

interface Report {
  id: string
  caseNumber: string
  referenceNumber: string
  reportType: ReportType
  urgencyLevel: UrgencyLevel
  status: ReportStatus
  title: string
  description: string
  evidence?: string
  createdAt: string
  updatedAt: string
  reporter: {
    id: string
    username: string
    discriminator?: string
    avatar?: string
  }
  updates: ReportUpdate[]
}

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<ReportStatus>()
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
      return
    }

    if (session && !session.user?.isStaff) {
      router.push('/')
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.isStaff) {
      fetchReport()
    }
  }, [session, params.id])

  const fetchReport = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/reports/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setReport(data.report)
        setNewStatus(data.report.status)
      } else if (response.status === 404) {
        router.push('/staff')
      }
    } catch (error) {
      console.error('Failed to fetch report:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReport = async () => {
    if (!report || (!notes && newStatus === report.status)) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/reports/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus !== report.status ? newStatus : undefined,
          notes: notes.trim() || undefined,
        }),
      })

      if (response.ok) {
        setNotes('')
        fetchReport() // Refresh to get updated data
      } else {
        alert('Failed to update report')
      }
    } catch (error) {
      console.error('Error updating report:', error)
      alert('Failed to update report')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.OPEN:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case ReportStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case ReportStatus.RESOLVED:
        return 'bg-green-100 text-green-800 border-green-200'
      case ReportStatus.CLOSED:
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case ReportStatus.ESCALATED:
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatStatus = (status: ReportStatus) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  if (status === 'loading' || !session?.user?.isStaff || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Report Not Found</h1>
          <Link href="/staff" className="text-indigo-600 hover:text-indigo-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const urgencyConfig = formatUrgencyLevel(report.urgencyLevel)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/staff" className="text-gray-600 hover:text-indigo-600">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <Shield className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
                <p className="text-sm text-gray-500">{report.caseNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(report.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(report.status)}`}>
                    {formatStatus(report.status)}
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {report.description}
                </div>
              </div>

              {report.evidence && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Evidence</h3>
                  <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {report.evidence}
                  </div>
                </div>
              )}
            </div>

            {/* Case Updates */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Case History</h3>
              <div className="space-y-4">
                {report.updates.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No updates yet</p>
                ) : (
                  report.updates.map((update) => (
                    <div key={update.id} className="border-l-4 border-indigo-200 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{update.action}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(update.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {update.details && (
                        <p className="text-sm text-gray-600 mt-1">{update.details}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">By: {update.staff.username}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Case Number</label>
                  <p className="font-mono text-sm text-gray-900">{report.caseNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Reference Number</label>
                  <p className="font-mono text-sm text-gray-900">{report.referenceNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Report Type</label>
                  <p className="text-sm text-gray-900">{formatReportType(report.reportType)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Urgency Level</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyConfig.color}`}>
                    {urgencyConfig.text}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-sm text-gray-900">
                    {new Date(report.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Reporter Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reporter</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {report.reporter.username}
                    {report.reporter.discriminator && `#${report.reporter.discriminator}`}
                  </p>
                  <p className="text-sm text-gray-500">Discord User</p>
                </div>
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Case</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {Object.values(ReportStatus).map((status) => (
                      <option key={status} value={status}>
                        {formatStatus(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add notes about this update..."
                  />
                </div>

                <button
                  onClick={updateReport}
                  disabled={updating || (!notes.trim() && newStatus === report.status)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Case
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
