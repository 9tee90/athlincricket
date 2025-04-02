import { Card } from "@/components/ui/card"
import { User } from "@/types/prisma"
import Image from "next/image"
import Link from "next/link"

interface CoachBadgeProps {
  coach: User
}

export function CoachBadge({ coach }: CoachBadgeProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          {coach.image ? (
            <Image
              src={coach.image}
              alt={coach.name || "Coach"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-2xl">
                {coach.name?.[0]?.toUpperCase() || "C"}
              </span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{coach.name}</h3>
          <p className="text-sm text-muted-foreground">Course Instructor</p>
          <Link
            href={`/coaches/${coach.id}` as any}
            className="text-sm text-primary hover:underline mt-1 inline-block"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Card>
  )
} 