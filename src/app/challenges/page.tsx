import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Challenge } from "@prisma/client";

export const dynamic = 'force-dynamic';

type ChallengeWithRelations = Challenge & {
  creator: { name: string | null };
  sponsor: { name: string | null } | null;
};

export default async function ChallengesPage() {
  const challenges = await db.challenge.findMany({
    where: {
      status: "active",
      deadline: {
        gte: new Date(),
      },
    },
    include: {
      creator: {
        select: {
          name: true,
        },
      },
      sponsor: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      deadline: "asc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Active Challenges</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge: ChallengeWithRelations) => (
          <Card key={challenge.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                <video
                  src={challenge.videoUrl}
                  className="object-cover w-full h-full"
                  poster="/placeholder.png"
                />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                <Badge variant="secondary">{challenge.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Created by {challenge.creator.name}
                </p>
                {challenge.sponsor && (
                  <p className="text-sm text-muted-foreground">
                    Sponsored by {challenge.sponsor.name}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Deadline: {formatDistanceToNow(challenge.deadline, { addSuffix: true })}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/challenges/${challenge.id}`} className="w-full">
                <Button className="w-full">View Challenge</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 