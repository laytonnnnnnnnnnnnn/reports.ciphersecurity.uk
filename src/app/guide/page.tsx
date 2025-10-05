'use client'

import Link from 'next/link'
import { ArrowLeft, AlertTriangle, FileText, Shield, Clock, Users, CheckCircle, XCircle } from 'lucide-react'

export default function GuidePage() {
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
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                About
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
            Reporting Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to effectively report incidents, what information to include, 
            and what to expect during the reporting process.
          </p>
        </div>

        {/* Before You Report */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-12">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You Report</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold">Important Legal Notice:</p>
                <p>If you report a crime to us, we are legally obligated to contact the relevant authorities. This ensures serious incidents receive proper investigation and we comply with our legal responsibilities.</p>
                <p className="text-sm text-gray-600">Consider whether your report involves criminal activity before proceeding.</p>
              </div>
            </div>
          </div>
        </div>

        {/* What to Report */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Should You Report?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-600 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Do Report These
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Harassment, bullying, or targeted abuse</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Threats of violence or self-harm</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Inappropriate content involving minors</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Doxxing or sharing personal information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Security vulnerabilities or data breaches</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Scams or fraudulent activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Server raids or coordinated attacks</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-red-600 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Don't Report These
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Minor disagreements or arguments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Being blocked or banned from servers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Personal relationship issues</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>False or malicious reports</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Revenge reports or personal vendettas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Issues already resolved by server moderators</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Write a Good Report */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Write an Effective Report</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Choose the Right Report Type</h3>
              <p className="text-gray-700 mb-3">Select the category that best matches your incident:</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><strong>Discord User:</strong> Issues with individual users' behavior</li>
                <li><strong>Discord Server:</strong> Problems with servers, channels, or server policies</li>
                <li><strong>Security Issue:</strong> Vulnerabilities, breaches, or suspicious activities</li>
                <li><strong>Data Protection:</strong> Privacy violations or GDPR concerns</li>
                <li><strong>Safeguarding:</strong> Safety concerns, especially involving vulnerable users</li>
              </ul>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Write a Clear Title</h3>
              <p className="text-gray-700 mb-3">Your title should be concise but descriptive (5-100 characters):</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm text-gray-900"><strong className="text-green-600">Good:</strong> "A user has leaked my personal information"</p>
                <p className="text-sm text-gray-900"><strong className="text-red-600">Bad:</strong> "i want to make a report"</p>
              </div>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Provide Detailed Description</h3>
              <p className="text-gray-700 mb-3">Include the following information (20-2000 characters):</p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>What happened:</strong> Describe the incident clearly</li>
                <li>• <strong>When it happened:</strong> Date and approximate time</li>
                <li>• <strong>Where it happened:</strong> Server name, channel, or DMs</li>
                <li>• <strong>Who was involved:</strong> Usernames and Discord IDs if known</li>
                <li>• <strong>Impact:</strong> How this affected you or others</li>
                <li>• <strong>Previous actions:</strong> Any steps already taken (blocking, reporting to Discord, etc.)</li>
              </ul>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Include Evidence</h3>
              <p className="text-gray-700 mb-3">Provide links to evidence (optional but highly recommended):</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Screenshots uploaded to image hosting services</li>
                <li>• Screen recordings of ongoing incidents</li>
                <li>• Message links (if accessible)</li>
                <li>• Server invite links (if relevant)</li>
              </ul>
              <p className="text-sm text-gray-500 mt-3">
                <strong>Note:</strong> Do not include personal information of others in evidence
              </p>
            </div>
          </div>
        </div>

        {/* Urgency Levels */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Urgency Levels</h2>
          <p className="text-gray-600 mb-6">Our system automatically assigns urgency levels based on report type and content:</p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="w-4 h-4 bg-red-500 rounded-full mt-1"></div>
              <div>
                <h3 className="font-semibold text-red-800 mb-2">HIGH Priority</h3>
                <p className="text-red-700 text-sm mb-2">Immediate attention required. Processed within hours.</p>
                <p className="text-red-600 text-xs">Triggered by: Safeguarding reports, threats, violence, self-harm, abuse, exploitation</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-4 h-4 bg-orange-500 rounded-full mt-1"></div>
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">MEDIUM Priority</h3>
                <p className="text-orange-700 text-sm mb-2">Processed within 1-3 business days.</p>
                <p className="text-orange-600 text-xs">Triggered by: Security issues, data protection, spam, scams, doxxing, impersonation</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">LOW Priority</h3>
                <p className="text-green-700 text-sm mb-2">Processed within 3-7 business days.</p>
                <p className="text-green-600 text-xs">Triggered by: General Discord user/server reports without urgent keywords</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Happens After You Report</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
                <p className="text-gray-600">You'll receive a case number and reference number for tracking your report.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Staff Notification</h3>
                <p className="text-gray-600">Our team receives your report immediately via secure channels with all relevant details.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Initial Review</h3>
                <p className="text-gray-600">A qualified staff member claims and reviews your report following our protocols.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-indigo-600">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Investigation & Action</h3>
                <p className="text-gray-600">Appropriate action is taken, which may include contacting authorities for criminal matters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Emergency Services</h3>
              <p className="text-gray-600 text-sm mb-2">For immediate danger to life:</p>
              <p className="font-semibold text-red-600">Call 999 (UK) or your local emergency number</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Discord Official Support</h3>
              <p className="text-gray-600 text-sm mb-2">For Discord Terms of Service violations:</p>
              <p className="font-semibold text-indigo-600">https://support.discord.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Mental Health Support</h3>
              <p className="text-gray-600 text-sm mb-2">If you need someone to talk to:</p>
              <p className="font-semibold text-green-600">Samaritans: 116 123</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cyber Crime</h3>
              <p className="text-gray-600 text-sm mb-2">Report cyber crimes:</p>
              <p className="font-semibold text-purple-600">Action Fraud: 0300 123 2040</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Submit Your Report?</h2>
          <p className="text-gray-700 mb-6">
            Now that you understand the process, you can submit your report with confidence.
          </p>
          <Link
            href="/report"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors mr-4"
          >
            <FileText className="h-5 w-5 mr-2" />
            Submit a Report
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Learn More About Us
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
    </div>
  )
}
