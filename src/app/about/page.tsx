'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Users, Clock, FileCheck, AlertTriangle, X } from 'lucide-react'

export default function AboutPage() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarning(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Cipher Systems</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Report
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Cipher Systems
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a secure and confidential platform for reporting Discord-related incidents, 
            security issues, data protection concerns, and safeguarding matters.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cipher Systems is dedicated to creating safer digital communities by providing an accessible, 
            secure, and anonymous reporting platform. We believe everyone deserves protection from harmful 
            behavior and violations in online spaces.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform enables users to report incidents confidentially while ensuring appropriate 
            authorities can respond effectively to protect community members.
          </p>
        </div>

        {/* What We Handle */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Handle</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Discord User Reports</h3>
                  <p className="text-gray-600">Issues with individual Discord users, harassment, or inappropriate behavior.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FileCheck className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Server Issues</h3>
                  <p className="text-gray-600">Problems with Discord servers, channels, or server-specific violations.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Security Issues</h3>
                  <p className="text-gray-600">Security vulnerabilities, breaches, or suspicious activities that need immediate attention.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
                  <p className="text-gray-600">Privacy violations, data breaches, or GDPR compliance concerns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit Report</h3>
              <p className="text-gray-600">Fill out our secure form with details about the incident. Reports can be anonymous or authenticated.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automatic Review</h3>
              <p className="text-gray-600">Reports are automatically assigned urgency levels and sent to our team via secure channels.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Action Taken</h3>
              <p className="text-gray-600">Our staff review and take appropriate action while maintaining confidentiality and following proper procedures.</p>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-3"></div>
              <p className="text-gray-700">All reports are transmitted securely and handled with strict confidentiality</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-3"></div>
              <p className="text-gray-700">Anonymous reporting is supported - no personal information required</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-3"></div>
              <p className="text-gray-700">We only collect minimal necessary information (Discord ID and username when authenticated)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-3"></div>
              <p className="text-gray-700">Reports are processed by trained staff following established protocols</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            For urgent matters or if you need to speak with someone directly, you can reach us through:
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Bailey: bailey@ciphersecurity.uk</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Layton: layton@ciphersecurity.uk</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Discord: discord.gg/ciphersecurity</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            For non-urgent matters, please use our reporting form for faster processing.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Submit a Report?</h2>
          <p className="text-gray-700 mb-6">
            If you've experienced or witnessed something that needs to be reported, 
            we're here to help ensure appropriate action is taken.
          </p>
          <Link
            href="/report"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit a Report
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Cipher Systems. Committed to digital safety and community protection.
          </p>
        </div>
      </footer>

      {/* Warning Popup */}
      {showWarning && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-in fade-in duration-300 border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Important Notice</h3>
                </div>
                <button 
                  onClick={() => setShowWarning(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Legal Obligation:</strong> If you report a crime to us, we are duty bound 
                  to contact the relevant authorities as required by law.
                </p>
                
                <p className="text-gray-600 text-sm">
                  This ensures that serious incidents receive appropriate investigation and that 
                  we comply with our legal responsibilities to protect the community.
                </p>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setShowWarning(false)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  I Understand
                </button>
                <Link
                  href="/"
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium text-center"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
