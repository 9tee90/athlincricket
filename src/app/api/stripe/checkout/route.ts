import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { User } from "@/types/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId } = await req.json()
    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 })
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        buyers: {
          include: {
            purchasedCourses: true
          }
        }
      },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    // Check if user already purchased the course
    if (course.buyers.some((buyer: User) => buyer.id === session.user.id)) {
      return new NextResponse("Already purchased", { status: 400 })
    }

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: 2999, // $29.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=true`,
      metadata: {
        courseId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 