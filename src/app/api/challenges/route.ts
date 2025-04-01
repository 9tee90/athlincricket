import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'xpro') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, videoUrl, reward, deadline } = body;

    // Check if user already has an active challenge
    const activeChallenge = await prisma.challenge.findFirst({
      where: {
        creatorId: session.user.id,
        status: 'active',
      },
    });

    if (activeChallenge) {
      return new NextResponse(
        'You already have an active challenge. Please complete or close it before creating a new one.',
        { status: 400 }
      );
    }

    // Create new challenge
    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        category,
        videoUrl,
        reward,
        deadline: new Date(deadline),
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 