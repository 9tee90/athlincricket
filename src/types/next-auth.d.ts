import "next-auth"

type Role = 'admin' | 'xpro' | 'sponsor' | 'player'

declare module "next-auth" {
  interface User {
    id: string
    email: string | null
    name: string | null
    role: Role
    isAdmin: boolean
  }

  interface Session {
    user: User & {
      id: string
      email: string | null
      name: string | null
      role: Role
      isAdmin: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "player" | "xpro" | "sponsor" | "admin"
    isAdmin: boolean
  }
} 