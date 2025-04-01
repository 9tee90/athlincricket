import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default async function ChallengePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const challenge = await db.challenge.findUnique({
    where: {
      id: params.id,
    },
    include: {
      submissions: {
        where: {
          winner: true,
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
    return <div>Challenge not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
        <p className="text-muted-foreground">{challenge.description}</p>
        <div className="mt-4 flex gap-2">
          <Badge variant="outline">{challenge.category}</Badge>
          <Badge variant="outline">
            {challenge.status === "active" ? "Active" : "Closed"}
          </Badge>
        </div>
      </div>

      {challenge.submissions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Winners</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenge.submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{submission.user.name}</CardTitle>
                    <Badge className="bg-yellow-500">🏆 Winner!</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                    <video
                      src={submission.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Submitted {formatDistanceToNow(submission.createdAt, { addSuffix: true })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Rest of the challenge content */}
    </div>
  );
} 