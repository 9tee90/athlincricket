'use client';

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Submission {
  id: string;
  user: {
    name: string | null;
  };
}

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
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={challenge.creator.image || undefined} />
            <AvatarFallback>
              {challenge.creator.name?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {challenge.creator.name}
          </span>
        </div>
        {challenge.sponsor && (
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={challenge.sponsor.image || undefined} />
              <AvatarFallback>
                {challenge.sponsor.name?.[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Sponsored by {challenge.sponsor.name}
            </span>
          </div>
        )}
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
            <h2 className="text-xl font-semibold">Winners</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {challenge.submissions.map((submission: Submission) => (
                <li key={submission.id}>{submission.user.name}</li>
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
          <Button variant="default">Upload Video</Button>
        </div>
      )}
    </div>
  );
} 