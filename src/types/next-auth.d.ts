import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role: "player" | "xpro" | "sponsor" | "admin"
    isAdmin: boolean
  }

  interface Session {
    user: User & {
      id: string
      email: string
      name: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "player" | "xpro" | "sponsor" | "admin"
    isAdmin: boolean
  }
} 