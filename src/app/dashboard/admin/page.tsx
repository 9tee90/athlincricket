import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { RoleSwitcher } from "@/components/dashboard/admin/RoleSwitcher"

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session?.user || session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and view different user roles and features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Role Switching</h2>
          <RoleSwitcher />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/coach/courses">View All Courses</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/xpro/challenges">View All Challenges</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/sponsor/opportunities">View All Opportunities</Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Users</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Courses</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Challenges</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 