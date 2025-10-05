import { v4 as uuidv4 } from 'uuid'
import { ReportType, UrgencyLevel } from '@prisma/client'

// Generate a random case number (e.g., CASE-2024-001234)
export function generateCaseNumber(): string {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 900000) + 100000 // 6 digit number
  return `CASE-${year}-${randomNum}`
}

// Generate a unique reference number using UUID
export function generateReferenceNumber(): string {
  return `REF-${uuidv4().slice(0, 8).toUpperCase()}`
}

// Auto-assign urgency level based on report type and keywords
export function assignUrgencyLevel(reportType: ReportType, description: string): UrgencyLevel {
  const criticalKeywords = [
    'immediate', 'urgent', 'emergency', 'suicide', 'self-harm', 'threat', 'violence',
    'child', 'minor', 'underage', 'abuse', 'exploitation', 'harassment'
  ]
  
  const highKeywords = [
    'security breach', 'data leak', 'personal information', 'privacy violation',
    'doxxing', 'stalking', 'discrimination', 'hate speech'
  ]

  const descriptionLower = description.toLowerCase()

  // Check for critical keywords
  if (criticalKeywords.some(keyword => descriptionLower.includes(keyword))) {
    return UrgencyLevel.CRITICAL
  }

  // Safeguarding reports are automatically high priority
  if (reportType === ReportType.SAFEGUARDING) {
    return UrgencyLevel.CRITICAL
  }

  // Security and data protection issues
  if (reportType === ReportType.SECURITY_ISSUES || reportType === ReportType.DATA_PROTECTION) {
    if (highKeywords.some(keyword => descriptionLower.includes(keyword))) {
      return UrgencyLevel.HIGH
    }
    return UrgencyLevel.MEDIUM
  }

  // Check for high priority keywords
  if (highKeywords.some(keyword => descriptionLower.includes(keyword))) {
    return UrgencyLevel.HIGH
  }

  // Default urgency level
  return UrgencyLevel.MEDIUM
}

// Format report type for display
export function formatReportType(type: ReportType): string {
  switch (type) {
    case ReportType.DISCORD_MATTERS:
      return 'Discord Matters'
    case ReportType.SECURITY_ISSUES:
      return 'Security Issues'
    case ReportType.DATA_PROTECTION:
      return 'Data Protection'
    case ReportType.SAFEGUARDING:
      return 'Safeguarding'
    default:
      return type
  }
}

// Format urgency level for display with colors
export function formatUrgencyLevel(level: UrgencyLevel): { text: string; color: string } {
  switch (level) {
    case UrgencyLevel.LOW:
      return { text: 'Low', color: 'text-green-600 bg-green-100' }
    case UrgencyLevel.MEDIUM:
      return { text: 'Medium', color: 'text-yellow-600 bg-yellow-100' }
    case UrgencyLevel.HIGH:
      return { text: 'High', color: 'text-orange-600 bg-orange-100' }
    case UrgencyLevel.CRITICAL:
      return { text: 'Critical', color: 'text-red-600 bg-red-100' }
    default:
      return { text: level, color: 'text-gray-600 bg-gray-100' }
  }
}