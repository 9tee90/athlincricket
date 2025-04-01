"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  deadline: Date
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = deadline.getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft("Expired")
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      )
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  return (
    <span className="font-mono text-sm">
      {timeLeft}
    </span>
  )
} 