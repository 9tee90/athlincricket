import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SubmissionForm } from "./submission-form";
import { Leaderboard } from "@/components/challenges/leaderboard";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { ShareButton } from "@/components/ui/share-button";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ChallengePageProps {
  params: {
    id: string;
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const session = await getServerSession(authOptions);
  const challenge = await db.challenge.findUnique({
    where: {
      id: params.id,
    },
    include: {
      creator: {
        select: {
          name: true,
          profileImage: true,
        },
      },
      sponsor: {
        select: {
          name: true,
          profileImage: true,
        },
      },
      submissions: {
        include: {
          user: {
            select: {
              name: true,
              profileImage: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!challenge) {
    notFound();
  }

  const isExpired = challenge.deadline < new Date();
  const hasUserSubmitted = session?.user
    ? challenge.submissions.some((sub) => sub.userId === session.user.id)
    : false;

  const userSubmission = session?.user
    ? challenge.submissions.find((sub) => sub.userId === session.user.id)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Challenge Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <Badge variant="secondary">{challenge.category}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={challenge.creator.profileImage || undefined} />
                <AvatarFallback>
                  {challenge.creator.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>Created by {challenge.creator.name}</span>
            </div>
            {challenge.sponsor && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={challenge.sponsor.profileImage || undefined} />
                  <AvatarFallback>
                    {challenge.sponsor.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>Sponsored by {challenge.sponsor.name}</span>
              </div>
            )}
            <CountdownTimer deadline={challenge.deadline} />
          </div>
        </div>
        <ShareButton title={challenge.title} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Challenge Video & Description */}
        <div className="space-y-6">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <video
              src={challenge.videoUrl}
              className="object-cover w-full h-full"
              controls
            />
          </div>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">About This Challenge</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground whitespace-pre-wrap">
                {challenge.description}
              </p>
              {challenge.reward && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold">Reward</h3>
                  <p>{challenge.reward}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Submission & Leaderboard */}
        <div className="space-y-6">
          {!isExpired ? (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Submit Your Entry</h2>
              </CardHeader>
              <CardContent>
                {!session ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Please log in to submit your entry.
                    </p>
                    <Link href="/auth/login">
                      <Button className="w-full">Log In to Submit</Button>
                    </Link>
                  </div>
                ) : session.user.role !== "player" ? (
                  <p className="text-muted-foreground">
                    Only players can submit entries to challenges.
                  </p>
                ) : hasUserSubmitted ? (
                  <div className="space-y-4">
                    <p className="text-green-600 font-medium">
                      Thanks for submitting your entry!
                    </p>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <video
                        src={userSubmission?.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                      />
                    </div>
                  </div>
                ) : (
                  <SubmissionForm challengeId={challenge.id} />
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  This challenge has ended. Submissions are no longer accepted.
                </p>
              </CardContent>
            </Card>
          )}

          <Leaderboard submissions={challenge.submissions} />
        </div>
      </div>
    </div>
  );
} 