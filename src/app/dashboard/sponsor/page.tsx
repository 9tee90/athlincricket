import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ChallengeList } from "@/components/dashboard/sponsor/ChallengeList"
import { InsightsPanel } from "@/components/dashboard/sponsor/InsightsPanel"

export default async function SponsorDashboard() {
  const session = await getServerSession(authOptions)

  // Redirect if not authenticated or not a sponsor
  if (!session?.user) {
    redirect("/auth/signin")
  }

  if (session.user.role !== "sponsor") {
    redirect(`/dashboard/${session.user.role}`)
  }

  // Fetch sponsored challenges
  const challenges = await prisma.challenge.findMany({
    where: {
      sponsorId: session.user.id,
    },
    include: {
      creator: {
        select: {
          name: true,
        },
      },
      submissions: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      deadline: "desc",
    },
  })

  // Calculate insights
  const totalChallenges = challenges.length
  const totalSubmissions = challenges.reduce((acc, challenge) => acc + challenge.submissions.length, 0)
  const averageEngagement = totalChallenges > 0 ? totalSubmissions / totalChallenges : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sponsor Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <InsightsPanel
            totalChallenges={totalChallenges}
            totalSubmissions={totalSubmissions}
            averageEngagement={averageEngagement}
          />
        </div>
        
        <div className="space-y-8">
          <ChallengeList challenges={challenges} />
        </div>
      </div>
    </div>
  )
} 