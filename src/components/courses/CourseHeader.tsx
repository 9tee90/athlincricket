import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { User } from "@/types/prisma"

interface CourseHeaderProps {
  title: string
  category: string
  coach: User
  hasAccess: boolean
}

export function CourseHeader({ title, category, coach, hasAccess }: CourseHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this cricket course by ${coach.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(window.location.href)
      // You might want to add a toast notification here
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-2">
            <Badge>{category}</Badge>
            <span className="text-muted-foreground">by {coach.name}</span>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 