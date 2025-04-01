import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { challengeId: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "xpro") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { winnerIds } = await req.json();

    if (!Array.isArray(winnerIds) || winnerIds.length === 0) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    // Verify the challenge belongs to the X-Pro
    const challenge = await db.challenge.findUnique({
      where: {
        id: params.challengeId,
        creatorId: session.user.id,
        status: "active",
        deadline: {
          lt: new Date(),
        },
      },
    });

    if (!challenge) {
      return new NextResponse("Challenge not found", { status: 404 });
    }

    // Update submissions to mark winners
    await db.submission.updateMany({
      where: {
        id: {
          in: winnerIds,
        },
        challengeId: params.challengeId,
      },
      data: {
        winner: true,
      },
    });

    // Update challenge status to closed
    await db.challenge.update({
      where: {
        id: params.challengeId,
      },
      data: {
        status: "closed",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CHALLENGE_WINNERS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 