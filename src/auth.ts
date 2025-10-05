import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify email',
        },
      },
      httpOptions: {
        timeout: 10000, // 10 seconds instead of default 3.5s
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  // Remove custom sign-in page to use NextAuth default
  // pages: {
  //   signIn: '/api/auth/signin',
  // },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'discord' && profile) {
        try {
          // Type assertion for Discord profile
          const discordProfile = profile as any
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { discordId: discordProfile.id }
          })

          const staffUserIds = process.env.STAFF_USER_IDS?.split(',') || []
          const isStaff = staffUserIds.includes(discordProfile.id)

          if (existingUser) {
            // Update existing user
            await prisma.user.update({
              where: { discordId: discordProfile.id },
              data: {
                username: discordProfile.username || discordProfile.global_name || 'Unknown',
                discriminator: discordProfile.discriminator,
                avatar: discordProfile.avatar,
                email: discordProfile.email,
                isStaff,
              }
            })
          } else {
            // Create new user
            await prisma.user.create({
              data: {
                discordId: discordProfile.id,
                username: discordProfile.username || discordProfile.global_name || 'Unknown',
                discriminator: discordProfile.discriminator,
                avatar: discordProfile.avatar,
                email: discordProfile.email,
                isStaff,
              }
            })
          }
          return true
        } catch (error) {
          console.error('Error creating/updating user:', error)
          return false
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect - url:', url, 'baseUrl:', baseUrl)
      
      // Always allow relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      
      // Allow same-origin URLs
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      // Parse the callback URL to check where user came from
      try {
        const urlObj = new URL(url)
        const callbackUrl = urlObj.searchParams.get('callbackUrl')
        
        if (callbackUrl) {
          console.log('Callback URL found:', callbackUrl)
          
          // Decode the callback URL if it's encoded
          const decodedCallbackUrl = decodeURIComponent(callbackUrl)
          
          // If user came from staff page, redirect back to staff page
          if (decodedCallbackUrl.includes('/staff')) {
            return `${baseUrl}/staff`
          }
          // If user came from report page, redirect back to report page
          if (decodedCallbackUrl.includes('/report')) {
            return `${baseUrl}/report`
          }
          
          // If it's a valid relative URL, use it
          if (decodedCallbackUrl.startsWith('/')) {
            return `${baseUrl}${decodedCallbackUrl}`
          }
        }
      } catch (error) {
        // If URL parsing fails, continue with default logic
        console.log('Redirect URL parsing failed:', error)
      }
      
      // Default redirect to home
      console.log('Defaulting to baseUrl:', baseUrl)
      return baseUrl
    },
    async session({ session, token }) {
      console.log('Session callback - token.sub:', token.sub, 'token.isStaff:', token.isStaff)
      
      if (token.sub && session.user) {
        // Use token data directly (no database calls to avoid timeouts)
        session.user.discordId = token.sub
        session.user.isStaff = !!token.isStaff // Ensure it's a boolean
        
        console.log('Set session.user.isStaff to:', session.user.isStaff)
      }
      
      console.log('Final session user:', session.user)
      return session
    },
    async jwt({ token, account, profile, user }) {
      console.log('JWT callback - account:', !!account, 'profile:', !!profile, 'existing token.isStaff:', token.isStaff)
      
      if (account && profile) {
        const discordProfile = profile as any
        token.sub = discordProfile.id
        console.log('Set token.sub to:', token.sub)
        
        // Check if user is staff and add to token
        try {
          const existingUser = await prisma.user.findUnique({
            where: { discordId: discordProfile.id }
          })
          
          if (existingUser) {
            token.isStaff = existingUser.isStaff
            console.log('Set token.isStaff to:', token.isStaff)
          }
        } catch (error) {
          console.error('Error checking staff status in JWT:', error)
        }
      } else if (token.sub && !token.isStaff) {
        // Token refresh - ensure isStaff is preserved
        console.log('Token refresh - checking staff status for:', token.sub)
        try {
          const existingUser = await prisma.user.findUnique({
            where: { discordId: token.sub }
          })
          
          if (existingUser) {
            token.isStaff = existingUser.isStaff
            console.log('Refreshed token.isStaff to:', token.isStaff)
          }
        } catch (error) {
          console.error('Error refreshing staff status in JWT:', error)
        }
      }
      
      console.log('Final JWT token:', token)
      return token
    }
  },
  session: {
    strategy: 'jwt'
  }
}