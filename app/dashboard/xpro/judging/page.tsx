import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function JudgingDashboard() {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "xpro") {
    redirect("/");
  }

  const challenges = await db.challenge.findMany({
    where: {
      creatorId: session.user.id,
      status: "active",
      deadline: {
        lt: new Date(),
      },
      submissions: {
        some: {
          winner: false,
        },
      },
    },
    include: {
      _count: {
        select: {
          submissions: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Select Challenge Winners</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader>
              <CardTitle>{challenge.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>Deadline: {formatDistanceToNow(challenge.deadline, { addSuffix: true })}</p>
                  <p>Submissions: {challenge._count.submissions}</p>
                </div>
                <Link href={`/dashboard/xpro/judging/${challenge.id}`}>
                  <Button className="w-full">Select Winners</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {challenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No challenges need judging at the moment.</p>
        </div>
      )}
    </div>
  );
} 