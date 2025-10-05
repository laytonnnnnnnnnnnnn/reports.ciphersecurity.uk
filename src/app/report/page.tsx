'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Shield, ArrowLeft, AlertTriangle, FileText, Lock, Users, Loader } from 'lucide-react'

const reportSchema = z.object({
  reportType: z.enum(['DISCORD_USER', 'DISCORD_SERVER', 'SECURITY_ISSUE', 'DATA_PROTECTION', 'SAFEGUARDING', 'OTHER']),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description must be less than 2000 characters'),
  evidence: z.string().optional(),
})

type ReportFormData = z.infer<typeof reportSchema>

const reportTypeOptions = [
  {
    value: 'DISCORD_USER',
    label: 'Discord User',
    description: 'Report issues with specific Discord users or their behavior',
    icon: FileText,
    color: 'blue'
  },
  {
    value: 'DISCORD_SERVER', 
    label: 'Discord Server',
    description: 'Report issues with Discord servers, channels, or server-specific problems',
    icon: FileText,
    color: 'blue'
  },
  {
    value: 'SECURITY_ISSUE',
    label: 'Security Issue',
    description: 'Security vulnerabilities, breaches, or suspicious activities',
    icon: AlertTriangle,
    color: 'red'
  },
  {
    value: 'DATA_PROTECTION',
    label: 'Data Protection',
    description: 'Privacy violations, data breaches, or GDPR compliance issues',
    icon: Lock,
    color: 'green'
  },
  {
    value: 'SAFEGUARDING',
    label: 'Safeguarding',
    description: 'Concerns about safety, welfare, or protection of vulnerable users',
    icon: Users,
    color: 'purple'
  },
  {
    value: 'OTHER',
    label: 'Other',
    description: 'Other types of reports that don\'t fit the above categories',
    icon: FileText,
    color: 'gray'
  }
]

export default function ReportPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [caseNumber, setCaseNumber] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema)
  })

  const watchedType = watch('reportType')
  const watchedDescription = watch('description', '')

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      console.log('Submitting report:', data)
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Report submission response:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Report submission failed:', errorText)
        throw new Error(`Failed to submit report: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Report submitted successfully:', result)
      setCaseNumber(result.caseNumber)
      setSubmitSuccess(true)
      
      // Scroll to success message
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (error) {
      console.error('Error submitting report:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Cipher Systems</h1>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Report Submitted Successfully</h1>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your report. We take all reports seriously and will review it promptly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Case Details</h2>
              <div className="text-left space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Case Number:</span>
                  <span className="ml-2 font-mono text-indigo-600">{caseNumber}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="ml-2 text-yellow-600">Under Review</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Submitted:</span>
                  <span className="ml-2 text-gray-600">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Please save your case number for future reference. You can check the status of your report using this number.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Return Home
              </Link>
              <button
                onClick={() => {
                  setSubmitSuccess(false)
                  setCaseNumber('')
                  setSubmitError('')
                }}
                className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Cipher Systems</h1>
            </Link>
            <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit a Report</h1>
          <p className="text-xl text-gray-600">
            Help us maintain a safe and secure environment for everyone
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-8 mb-0">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    <strong>Error:</strong> {submitError}
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setSubmitError('')}
                    className="text-red-400 hover:text-red-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {/* Report Type Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What type of issue are you reporting? *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {reportTypeOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = watchedType === option.value
                  return (
                    <label
                      key={option.value}
                      className={`relative block cursor-pointer rounded-xl border-2 p-6 transition-all hover:border-gray-300 ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <input
                        {...register('reportType')}
                        type="radio"
                        value={option.value}
                        className="sr-only"
                      />
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                        option.color === 'blue' ? 'bg-blue-100' :
                        option.color === 'red' ? 'bg-red-100' :
                        option.color === 'green' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          option.color === 'blue' ? 'text-blue-600' :
                          option.color === 'red' ? 'text-red-600' :
                          option.color === 'green' ? 'text-green-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.label}</h3>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </label>
                  )
                })}
              </div>
              {errors.reportType && (
                <p className="mt-2 text-sm text-red-600">{errors.reportType.message}</p>
              )}
            </div>

            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-2">
                Report Title *
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Brief summary of the issue"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mb-2">
                Detailed Description *
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Please provide as much detail as possible about the incident, including dates, times, usernames, and any other relevant information..."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description ? (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Minimum 20 characters required for a detailed report
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {watchedDescription.length}/2000
                </p>
              </div>
            </div>

            {/* Evidence */}
            <div className="mb-8">
              <label htmlFor="evidence" className="block text-lg font-semibold text-gray-900 mb-2">
                Additional Evidence (Optional)
              </label>
              <textarea
                {...register('evidence')}
                id="evidence"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Links to screenshots, chat logs, or other supporting evidence. Please do not include personal information of others without consent."
              />
              <p className="mt-2 text-sm text-gray-500">
                You can include links to screenshots, documents, or other relevant evidence.
              </p>
            </div>



            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Submitting Report...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information Panel */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens after you submit?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">1. Immediate Processing</h4>
              <p className="text-gray-600">Your report is assigned a unique case number and our team is notified immediately.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">2. Review & Investigation</h4>
              <p className="text-gray-600">Our trained professionals review your report and begin appropriate investigation procedures.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">3. Follow-up</h4>
              <p className="text-gray-600">We'll contact you if we need additional information or to update you on the progress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
