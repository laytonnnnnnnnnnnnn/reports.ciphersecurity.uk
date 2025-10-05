import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('Session API called')
    
    // Get JWT token directly
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    console.log('JWT Token:', token)
    
    if (!token || !token.sub) {
      console.log('No token or sub found')
      return NextResponse.json({ user: null, isStaff: false })
    }
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { discordId: token.sub }
    })
    
    console.log('User from DB:', user)
    
    if (!user) {
      console.log('User not found in database')
      return NextResponse.json({ user: null, isStaff: false })
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        discordId: user.discordId,
        username: user.username,
        isStaff: user.isStaff
      },
      isStaff: user.isStaff
    })
    
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ user: null, isStaff: false, error: 'Internal server error' })
  }
}
