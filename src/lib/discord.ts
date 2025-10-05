import { ReportType, UrgencyLevel } from '@prisma/client'
import { formatReportType, formatUrgencyLevel } from './utils'

interface DiscordUser {
  id: string
  username: string
  discriminator?: string
  avatar?: string
}

interface ReportData {
  caseNumber: string
  referenceNumber: string
  reportType: ReportType
  urgencyLevel: UrgencyLevel
  title: string
  description: string
  reporter: DiscordUser
}

export async function sendDiscordWebhook(reportData: ReportData): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured')
    return false
  }

  const urgencyConfig = formatUrgencyLevel(reportData.urgencyLevel)
  const reportTypeFormatted = formatReportType(reportData.reportType)

  // Determine embed color based on urgency
  const getEmbedColor = (urgency: UrgencyLevel): number => {
    switch (urgency) {
      case UrgencyLevel.CRITICAL: return 0xff0000 // Red
      case UrgencyLevel.HIGH: return 0xff8c00 // Orange
      case UrgencyLevel.MEDIUM: return 0xffd700 // Yellow
      case UrgencyLevel.LOW: return 0x00ff00 // Green
      default: return 0x808080 // Gray
    }
  }

  const embed = {
    title: '🚨 New Report Submitted',
    color: getEmbedColor(reportData.urgencyLevel),
    fields: [
      {
        name: '📋 Case Information',
        value: [
          `**Case Number:** ${reportData.caseNumber}`,
          `**Reference:** ${reportData.referenceNumber}`,
          `**Type:** ${reportTypeFormatted}`,
          `**Urgency:** ${urgencyConfig.text}`
        ].join('\n'),
        inline: false
      },
      {
        name: '📝 Report Details',
        value: [
          `**Title:** ${reportData.title}`,
          `**Description:** ${reportData.description.substring(0, 500)}${reportData.description.length > 500 ? '...' : ''}`
        ].join('\n'),
        inline: false
      },
      {
        name: '👤 Reporter',
        value: [
          `**User:** ${reportData.reporter.username}${reportData.reporter.discriminator ? `#${reportData.reporter.discriminator}` : ''}`,
          `**Discord ID:** ${reportData.reporter.id}`
        ].join('\n'),
        inline: true
      }
    ],
    footer: {
      text: 'Cipher Systems',
    },
    timestamp: new Date().toISOString()
  }

  const payload = {
    username: 'Report Bot',
    avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
    embeds: [embed]
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error('Failed to send Discord webhook:', response.status, response.statusText)
      return false
    }

    console.log('Discord webhook sent successfully')
    return true
  } catch (error) {
    console.error('Error sending Discord webhook:', error)
    return false
  }
}

// Send status update webhook
export async function sendStatusUpdateWebhook(
  caseNumber: string,
  oldStatus: string,
  newStatus: string,
  staffUsername: string,
  notes?: string
): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured')
    return false
  }

  const embed = {
    title: '📊 Report Status Updated',
    color: 0x0099ff, // Blue
    fields: [
      {
        name: '📋 Case Information',
        value: `**Case Number:** ${caseNumber}`,
        inline: false
      },
      {
        name: '🔄 Status Change',
        value: `**From:** ${oldStatus}\n**To:** ${newStatus}`,
        inline: true
      },
      {
        name: '👮 Updated By',
        value: staffUsername,
        inline: true
      }
    ],
    footer: {
      text: 'Cipher Systems - Status Update',
    },
    timestamp: new Date().toISOString()
  }

  if (notes) {
    embed.fields.push({
      name: '📝 Notes',
      value: notes.substring(0, 500),
      inline: false
    })
  }

  const payload = {
    username: 'Report Bot',
    avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
    embeds: [embed]
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    return response.ok
  } catch (error) {
    console.error('Error sending status update webhook:', error)
    return false
  }
}