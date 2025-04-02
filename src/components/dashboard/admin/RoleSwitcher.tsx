"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ROLE_ROUTES = {
  coach: "/dashboard/coach",
  xpro: "/dashboard/xpro",
  sponsor: "/dashboard/sponsor",
  player: "/dashboard/player",
} as const

export function RoleSwitcher() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>("")

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
  }

  const handleNavigate = () => {
    if (selectedRole && ROLE_ROUTES[selectedRole as keyof typeof ROLE_ROUTES]) {
      router.push(ROLE_ROUTES[selectedRole as keyof typeof ROLE_ROUTES])
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Switch Role</label>
        <Select onValueChange={handleRoleChange} value={selectedRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ROLE_ROUTES).map(([role, route]) => (
              <SelectItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        className="w-full" 
        onClick={handleNavigate}
        disabled={!selectedRole}
      >
        Go to Selected Role
      </Button>
    </div>
  )
} 