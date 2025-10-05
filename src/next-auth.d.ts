import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      discordId: string
      isStaff: boolean
    }
  }

  interface User {
    id: string
    discordId: string
    isStaff: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
    isStaff?: boolean
  }
}