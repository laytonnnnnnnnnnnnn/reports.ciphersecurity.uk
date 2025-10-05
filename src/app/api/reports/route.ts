import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateCaseNumber, generateReferenceNumber } from '@/lib/utils'
import { z } from 'zod'

enum ReportType {
  DISCORD_USER = 'DISCORD_USER',
  DISCORD_SERVER = 'DISCORD_SERVER', 
  SECURITY_ISSUE = 'SECURITY_ISSUE',
  DATA_PROTECTION = 'DATA_PROTECTION',
  SAFEGUARDING = 'SAFEGUARDING',
  OTHER = 'OTHER'
}

const createReportSchema = z.object({
  reportType: z.nativeEnum(ReportType),
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  evidence: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = createReportSchema.parse(body)

    // Check for authentication to get user details, but allow anonymous reports
    const session = await getServerSession(authOptions)

    // Generate case details
    const caseNumber = generateCaseNumber()
    const referenceNumber = generateReferenceNumber()
    
    // Assign urgency level
    const urgencyLevel = assignUrgencyLevel(validatedData.reportType, validatedData.description)

    // Send report to Discord webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      throw new Error('Discord webhook URL not configured')
    }

    // Format report for Discord
    const reportEmbed = {
      title: `New Report - Case #${caseNumber}`,
      color: urgencyLevel === 'HIGH' ? 0xff0000 : urgencyLevel === 'MEDIUM' ? 0xffa500 : 0x00ff00,
      fields: [
        {
          name: 'Case Details',
          value: `**Case Number:** ${caseNumber}\n\n**Reference:** ${referenceNumber}\n\n**Urgency Level:** ${urgencyLevel}`,
          inline: true
        },
        {
          name: 'Report Type',
          value: validatedData.reportType.replace(/_/g, ' '),
          inline: true
        },
        {
          name: 'Reporter Information',
          value: session?.user ? `**Discord ID:** ${session.user.discordId}\n\n**Username:** ${session.user.name}` : 'Anonymous Report',
          inline: true
        },
        {
          name: 'Report Title', 
          value: validatedData.title,
          inline: false
        },
        {
          name: 'Description',
          value: validatedData.description.length > 1024 ? validatedData.description.slice(0, 1021) + '...' : validatedData.description,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: `Reported via Discord Reporting System`
      }
    }

    if (validatedData.evidence) {
      reportEmbed.fields.push({
        name: 'Evidence Links',
        value: validatedData.evidence,
        inline: false
      })
    }

    // Create staff information embed
    const staffEmbed = {
      title: 'Staff Information',
      description: 'If you wish to claim this report, Please consider a few things',
      color: 0x2b2d31, // Discord's dark gray color
      fields: [
        {
          name: 'Conflict of Interest Policy',
          value: '• You cannot accept the report if you have a conflict of interest or involvement\n• You cannot accept the report if it involves a friend',
          inline: false
        },
        {
          name: 'Report Claiming Process',
          value: '• Once you accept a report, Make it very clear in this channel\n• Once making the case log, Ensure it has the reference number provided by the API',
          inline: false
        },
        {
          name: 'Reference Number',
          value: `**${referenceNumber}**`,
          inline: false
        }
      ]
    }

    // Send to Discord
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [reportEmbed, staffEmbed]
      })
    })

    if (!webhookResponse.ok) {
      throw new Error(`Discord webhook failed: ${webhookResponse.statusText}`)
    }

    return NextResponse.json({
      success: true,
      caseNumber,
      referenceNumber,
      urgencyLevel,
    })

  } catch (error) {
    console.error('Error creating report:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to assign urgency level based on report type and keywords
function assignUrgencyLevel(reportType: ReportType, description: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  const criticalKeywords = [
    'immediate', 'urgent', 'emergency', 'suicide', 'self-harm', 'threat', 'violence',
    'child', 'minor', 'underage', 'abuse', 'exploitation', 'harassment'
  ]

  const mediumKeywords = [
    'spam', 'scam', 'inappropriate', 'bullying', 'doxxing', 'fake', 'impersonation'
  ]

  const descLower = description.toLowerCase()
  
  // High priority cases
  if (reportType === ReportType.SAFEGUARDING || 
      criticalKeywords.some(keyword => descLower.includes(keyword))) {
    return 'HIGH'
  }

  // Medium priority cases
  if (reportType === ReportType.SECURITY_ISSUE || 
      reportType === ReportType.DATA_PROTECTION ||
      mediumKeywords.some(keyword => descLower.includes(keyword))) {
    return 'MEDIUM'
  }

  return 'LOW'
}
