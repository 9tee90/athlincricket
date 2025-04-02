import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PoseFeedbackForm } from "./pose-feedback-form";

export default async function PoseFeedbackPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'xpro') {
    redirect('/auth/signin');
  }

  const submissions = await prisma.submission.findMany({
    where: {
      challenge: {
        creatorId: session.user.id,
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      challenge: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const pendingSubmissions = submissions.filter(sub => !sub.poseReviewed);
  const completedSubmissions = submissions.filter(sub => sub.poseReviewed);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Pose Feedback</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pendingSubmissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <CardTitle className="text-lg">{submission.challenge.title}</CardTitle>
              <Badge variant="secondary">{submission.user.name || 'Anonymous'}</Badge>
            </CardHeader>
            <CardContent>
              <div className="aspect-video mb-4">
                <video
                  src={submission.videoUrl}
                  controls
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <PoseFeedbackForm submissionId={submission.id} />
            </CardContent>
          </Card>
        ))}
      </div>

      {completedSubmissions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Completed Reviews</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{submission.challenge.title}</CardTitle>
                  <Badge variant="secondary">{submission.user.name || 'Anonymous'}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <video
                      src={submission.videoUrl}
                      controls
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-2">Feedback:</p>
                    <p>{submission.poseFeedback}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 