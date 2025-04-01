import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "player") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { challengeId, videoUrl } = body;

    if (!challengeId || !videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if challenge exists and is active
    const challenge = await db.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    if (!challenge) {
      return new NextResponse("Challenge not found", { status: 404 });
    }

    if (challenge.status !== "active") {
      return new NextResponse("Challenge is not active", { status: 400 });
    }

    if (challenge.deadline < new Date()) {
      return new NextResponse("Challenge deadline has passed", { status: 400 });
    }

    // Check if user has already submitted
    const existingSubmission = await db.submission.findFirst({
      where: {
        challengeId,
        userId: session.user.id,
      },
    });

    if (existingSubmission) {
      return new NextResponse("You have already submitted an entry", { status: 400 });
    }

    // Create submission
    const submission = await db.submission.create({
      data: {
        challengeId,
        userId: session.user.id,
        videoUrl,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("[SUBMISSIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 