import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { submissionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { poseFeedback, poseReviewed } = body;

    // Verify that the submission belongs to a challenge created by the current user
    const submission = await prisma.submission.findUnique({
      where: {
        id: params.submissionId,
      },
      include: {
        challenge: true,
      },
    });

    if (!submission || submission.challenge.creatorId !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedSubmission = await prisma.submission.update({
      where: {
        id: params.submissionId,
      },
      data: {
        poseFeedback,
        poseReviewed,
      },
    });

    return NextResponse.json(updatedSubmission);
  } catch (error) {
    console.error('Error updating submission:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 