import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { User } from "@/types/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { courseId } = await req.json()
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        buyers: true,
      },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    // Check if user already purchased the course
    if (course.buyers.some((buyer: User) => buyer.id === session.user.id)) {
      return new NextResponse("Already purchased", { status: 400 })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: course.title,
              description: course.description,
            },
            unit_amount: 1000, // $10 for now
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId,
        userId: session.user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=true`,
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 