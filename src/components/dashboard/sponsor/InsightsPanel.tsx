import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Target, PlayCircle } from "lucide-react"

interface InsightsPanelProps {
  totalChallenges: number
  totalSubmissions: number
  averageEngagement: number
}

export function InsightsPanel({
  totalChallenges,
  totalSubmissions,
  averageEngagement,
}: InsightsPanelProps) {
  // Mocked video views for future implementation
  const estimatedViews = totalSubmissions * 100

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Insights</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChallenges}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageEngagement.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Submissions per challenge
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Video Views</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estimatedViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Based on submission count
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 