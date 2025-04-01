"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard copy
      try {
        await navigator.clipboard.writeText(window.location.href)
        // You might want to show a toast notification here
      } catch (error) {
        console.error("Error copying to clipboard:", error)
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleShare}
      className="h-10 w-10"
    >
      <Share2 className="h-4 w-4" />
      <span className="sr-only">Share</span>
    </Button>
  )
} 