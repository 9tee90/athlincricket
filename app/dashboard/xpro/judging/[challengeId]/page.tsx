import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { SelectWinnersForm } from "./select-winners-form";

export default async function ChallengeJudgingPage({
  params,
}: {
  params: { challengeId: string };
}) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "xpro") {
    redirect("/");
  }

  const challenge = await db.challenge.findUnique({
    where: {
      id: params.challengeId,
      creatorId: session.user.id,
      status: "active",
      deadline: {
        lt: new Date(),
      },
    },
    include: {
      submissions: {
        where: {
          winner: false,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!challenge) {
    redirect("/dashboard/xpro/judging");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
        <p className="text-muted-foreground">
          Select up to 3 winners for this challenge
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenge.submissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <CardTitle className="text-lg">{submission.user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                  <video
                    src={submission.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Submitted {formatDistanceToNow(submission.createdAt, { addSuffix: true })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {challenge.submissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No submissions to judge.</p>
        </div>
      )}

      <SelectWinnersForm
        challengeId={challenge.id}
        submissions={challenge.submissions}
      />
    </div>
  );
} 