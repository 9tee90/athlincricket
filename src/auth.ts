import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }
  return session
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Not authorized")
  }
  return session
}

export const auth = {
  getSession,
  getCurrentUser,
  requireAuth,
  requireAdmin,
} 