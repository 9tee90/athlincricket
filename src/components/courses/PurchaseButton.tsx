'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface PurchaseButtonProps {
  courseId: string
}

export function PurchaseButton({ courseId }: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePurchase = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Purchase error:", error)
      toast({
        title: "Error",
        description: "Failed to initiate purchase. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      className="w-full" 
      onClick={handlePurchase}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "💳 Unlock This Course ($10)"}
    </Button>
  )
} 