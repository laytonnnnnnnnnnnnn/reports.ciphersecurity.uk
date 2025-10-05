import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendStatusUpdateWebhook } from '@/lib/discord'
import { ReportStatus } from '@prisma/client'
import { z } from 'zod'

const updateReportSchema = z.object({
  status: z.nativeEnum(ReportStatus).optional(),
  notes: z.string().max(1000).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.discordId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { discordId: session.user.discordId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        reporter: {
          select: {
            id: true,
            username: true,
            discriminator: true,
            avatar: true
          }
        },
        updates: {
          orderBy: { createdAt: 'desc' },
          include: {
            staff: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }
      }
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // Check permissions: users can only see their own reports, staff can see all
    if (!user.isStaff && report.reporterId !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    return NextResponse.json({ report })

  } catch (error) {
    console.error('Error fetching report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.discordId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { discordId: session.user.discordId }
    })

    if (!user?.isStaff) {
      return NextResponse.json(
        { error: 'Staff access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = updateReportSchema.parse(body)

    const report = await prisma.report.findUnique({
      where: { id: params.id }
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    const oldStatus = report.status

    // Update report
    const updatedReport = await prisma.report.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        reporter: {
          select: {
            username: true,
            discriminator: true
          }
        }
      }
    })

    // Create update record
    if (validatedData.status || validatedData.notes) {
      let action = ''
      if (validatedData.status && validatedData.status !== oldStatus) {
        action = `Status changed from ${oldStatus} to ${validatedData.status}`
      } else if (validatedData.notes) {
        action = 'Note added'
      }

      await prisma.reportUpdate.create({
        data: {
          reportId: report.id,
          staffId: user.id,
          action,
          details: validatedData.notes || null,
        }
      })

      // Send Discord webhook for status changes
      if (validatedData.status && validatedData.status !== oldStatus) {
        try {
          await sendStatusUpdateWebhook(
            report.caseNumber,
            oldStatus,
            validatedData.status,
            user.username,
            validatedData.notes
          )
        } catch (webhookError) {
          console.error('Failed to send status update webhook:', webhookError)
        }
      }
    }

    return NextResponse.json({ 
      success: true,
      report: updatedReport
    })

  } catch (error) {
    console.error('Error updating report:', error)
    
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
