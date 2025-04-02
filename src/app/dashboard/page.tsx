"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  // Redirect to role-specific dashboard
  if (session?.user?.role) {
    redirect(`/dashboard/${session.user.role}`)
  }

  return null
} 