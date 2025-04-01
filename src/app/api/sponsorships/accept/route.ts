import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "xpro") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const formData = await req.formData()
    const sponsorshipId = formData.get("sponsorshipId") as string

    if (!sponsorshipId) {
      return new NextResponse("Missing sponsorship ID", { status: 400 })
    }

    // Verify the sponsorship exists and belongs to the current user
    const sponsorship = await prisma.sponsorship.findFirst({
      where: {
        id: sponsorshipId,
        xProId: session.user.id,
        status: "pending",
      },
    })

    if (!sponsorship) {
      return new NextResponse("Sponsorship not found", { status: 404 })
    }

    // Update the sponsorship status
    await prisma.sponsorship.update({
      where: { id: sponsorshipId },
      data: { status: "accepted" },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error accepting sponsorship:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 