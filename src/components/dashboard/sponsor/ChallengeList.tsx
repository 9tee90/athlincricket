import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Challenge, User } from "@prisma/client"

type ChallengeWithDetails = Challenge & {
  creator: Pick<User, "name">
  submissions: { id: string }[]
}

interface ChallengeListProps {
  challenges: ChallengeWithDetails[]
}

export function ChallengeList({ challenges }: ChallengeListProps) {
  const activeChallenges = challenges.filter(c => c.status === "active")
  const pastChallenges = challenges.filter(c => c.status !== "active")

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">My Sponsored Challenges</h2>
      
      {/* Active Challenges */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active Challenges</h3>
        <div className="grid gap-4">
          {activeChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>

      {/* Past Challenges */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Past Challenges</h3>
        <div className="grid gap-4">
          {pastChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChallengeCard({ challenge }: { challenge: ChallengeWithDetails }) {
  return (
    <Link href={`/challenges/${challenge.id}`}>
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">{challenge.title}</CardTitle>
          <Badge variant={challenge.status === "active" ? "default" : "secondary"}>
            {challenge.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Category:</span>
              <span className="capitalize">{challenge.category}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Creator:</span>
              <span>{challenge.creator.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Deadline:</span>
              <span>{new Date(challenge.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Submissions:</span>
              <span>{challenge.submissions.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 