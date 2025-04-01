'use client';

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";

export default function ChallengePage() {
  const params = useParams();
  const { data: session } = useSession();
  const { data: challenge, isLoading } = api.challenges.get.useQuery({
    id: params.id as string,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{challenge.title}</h1>
      <div className="mb-8">
        <p className="text-lg mb-4">{challenge.description}</p>
        <p className="text-sm text-muted-foreground">
          Created by {challenge.creator.name || 'Anonymous'}
        </p>
        <div className="mt-4 flex gap-2">
          <Badge variant="outline">{challenge.category}</Badge>
          <Badge variant="outline">
            {challenge.status === "active"
              ? `Ends ${formatDistanceToNow(new Date(challenge.deadline))}`
              : "Closed"}
          </Badge>
        </div>
      </div>

      {challenge.submissions.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {challenge.submissions.map((submission) => (
                <li key={submission.id}>{submission.user.name || 'Anonymous'}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {session?.user && session.user.role === "player" && challenge.status === "active" && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Submit Your Entry</h2>
          <p className="text-muted-foreground mb-6">
            Upload your video to participate in this challenge.
          </p>
        </div>
      )}
    </div>
  );
} 