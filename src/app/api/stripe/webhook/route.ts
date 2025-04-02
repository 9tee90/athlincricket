import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook Error:", err)
    return new NextResponse("Webhook signature verification failed", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const courseId = session.metadata?.courseId
    const userId = session.metadata?.userId

    if (!userId || !courseId) {
      return new NextResponse("Missing metadata", { status: 400 })
    }

    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          purchasedCourses: {
            connect: { id: courseId },
          },
        },
      })

      return new NextResponse("Course purchased successfully", { status: 200 })
    } catch (error) {
      console.error("Error updating user's purchased courses:", error)
      return new NextResponse("Error updating user's purchased courses", { status: 500 })
    }
  }

  return new NextResponse("OK")
} 