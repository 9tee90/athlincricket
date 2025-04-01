import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getXProData(userId: string) {
  const [activeChallenge, pendingSponsorships] = await Promise.all([
    prisma.challenge.findFirst({
      where: {
        creatorId: userId,
        status: "active",
      },
      include: {
        sponsor: true,
        submissions: true,
      },
    }),
    prisma.sponsorship.findMany({
      where: {
        xProId: userId,
        status: "pending",
      },
      include: {
        sponsor: true,
      },
    }),
  ])

  return { activeChallenge, pendingSponsorships }
}

export default async function XProDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  if (session.user.role !== "xpro") {
    redirect(`/dashboard/${session.user.role}`)
  }

  const { activeChallenge, pendingSponsorships } = await getXProData(session.user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">XPro Dashboard</h1>

      {/* Active Challenge Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">My Active Challenge</h2>
        {activeChallenge ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-2">{activeChallenge.title}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Deadline:</span>{" "}
                {new Date(activeChallenge.deadline).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Submissions:</span>{" "}
                {activeChallenge.submissions.length}
              </div>
              {activeChallenge.sponsor && (
                <div className="col-span-2">
                  <span className="font-medium">Sponsor:</span>{" "}
                  {activeChallenge.sponsor.name}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            You don't have any active challenges right now.
          </div>
        )}
      </section>

      {/* Sponsor Offers Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sponsor Offers Available</h2>
        {pendingSponsorships.length > 0 ? (
          <div className="space-y-4">
            {pendingSponsorships.map((sponsorship) => (
              <div key={sponsorship.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{sponsorship.sponsor.name}</h3>
                    <p className="text-sm text-gray-600">
                      Offered: ${sponsorship.amount}
                    </p>
                  </div>
                  <form action="/api/sponsorships/accept" method="POST">
                    <input type="hidden" name="sponsorshipId" value={sponsorship.id} />
                    <Button type="submit">Accept Offer</Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No pending sponsor offers at the moment.
          </div>
        )}
      </section>

      {/* Create Challenge Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Challenge</h2>
        <Link
          href="/challenges/new"
          className={`inline-block ${
            activeChallenge ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Button disabled={!!activeChallenge}>
            Create New Challenge
          </Button>
        </Link>
      </section>

      {/* Challenge Templates Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Challenge Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Get Ready With Me",
              description: "Share your pre-match routine and preparation tips",
              image: "/templates/pre-match.jpg",
            },
            {
              title: "Batting Drill",
              description: "Demonstrate your favorite batting practice drills",
              image: "/templates/batting.jpg",
            },
            {
              title: "Pre-Match Nutrition",
              description: "Show your go-to pre-match meals and snacks",
              image: "/templates/nutrition.jpg",
            },
          ].map((template) => (
            <div
              key={template.title}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="aspect-video bg-gray-200">
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gray-200" />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submission Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>
        {activeChallenge ? (
          <div className="space-y-4">
            {activeChallenge.submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow p-6">
                <div className="aspect-video relative mb-4">
                  <video
                    src={submission.videoUrl}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  />
                </div>
                <div className="text-sm text-gray-600">
                  Submitted {new Date(submission.createdAt).toLocaleDateString()}
                </div>
                {submission.poseReviewed && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Coach Feedback</h4>
                    <p className="text-sm text-gray-600">{submission.poseFeedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p>You haven&apos;t submitted any entries yet.</p>
          </div>
        )}
      </section>
    </div>
  )
} 