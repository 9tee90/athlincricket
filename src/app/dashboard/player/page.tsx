import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { FeedbackHelpfulButton } from "./components/feedback-helpful-button"
import type { Route } from "next"

interface Submission {
  id: string
  videoUrl: string
  createdAt: Date
  poseReviewed: boolean
  poseFeedback: string | null
  feedbackHelpful: boolean | null
  challenge: {
    id: string
    title: string
    status: string
  }
  user: {
    name: string
  }
}

export default async function PlayerDashboard() {
  const session = await getServerSession(authOptions)

  // Redirect if not authenticated or not a player
  if (!session?.user || session.user.role !== "player") {
    redirect("/auth/signin")
  }

  // Fetch user's submissions with challenge details
  const submissions = await prisma.submission.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      challenge: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as unknown as Submission[]

  // Group submissions by challenge status
  const openSubmissions = submissions.filter(
    (sub) => sub.challenge.status === "active"
  )
  const closedSubmissions = submissions.filter(
    (sub) => sub.challenge.status === "closed"
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Button asChild>
          <Link href={"/challenges" as Route}>Browse Challenges</Link>
        </Button>
      </div>

      {/* Open Submissions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Active Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {openSubmissions.length === 0 ? (
            <p className="text-muted-foreground">
              You haven&apos;t submitted any entries yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {openSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video relative mb-4">
                      <video
                        src={submission.videoUrl}
                        className="w-full h-full object-cover rounded-lg"
                        controls
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{submission.challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted {formatDistanceToNow(submission.createdAt, { addSuffix: true })}
                    </p>
                    <Button variant="link" className="p-0 mt-2" asChild>
                      <Link href={`/challenges/${submission.challenge.id}`}>
                        View Challenge
                      </Link>
                    </Button>
                    {submission.poseReviewed && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Coach Feedback</h4>
                        <p className="text-sm text-muted-foreground">{submission.poseFeedback}</p>
                        {!submission.feedbackHelpful && (
                          <FeedbackHelpfulButton submissionId={submission.id} />
                        )}
                      </div>
                    )}
                    {!submission.poseReviewed && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Feedback coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Closed Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Past Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {closedSubmissions.length === 0 ? (
            <p className="text-muted-foreground">No past submissions yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {closedSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video relative mb-4">
                      <video
                        src={submission.videoUrl}
                        className="w-full h-full object-cover rounded-lg"
                        controls
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{submission.challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted {formatDistanceToNow(submission.createdAt, { addSuffix: true })}
                    </p>
                    <Button variant="link" className="p-0 mt-2" asChild>
                      <Link href={`/challenges/${submission.challenge.id}`}>
                        View Challenge
                      </Link>
                    </Button>
                    {submission.poseReviewed && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Coach Feedback</h4>
                        <p className="text-sm text-muted-foreground">{submission.poseFeedback}</p>
                        {!submission.feedbackHelpful && (
                          <FeedbackHelpfulButton submissionId={submission.id} />
                        )}
                      </div>
                    )}
                    {!submission.poseReviewed && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Feedback coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 