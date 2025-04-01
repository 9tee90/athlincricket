import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

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

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Judging Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
              <p className="text-muted-foreground mb-4">
                {challenge.submissions.length} submissions
              </p>
              <a
                href={`/dashboard/xpro/judging/${challenge.id}`}
                className="text-primary hover:underline"
              >
                Select Winners →
              </a>
            </div>
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