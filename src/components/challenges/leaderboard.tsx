import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface Submission {
  id: string;
  videoUrl: string;
  createdAt: Date;
  user: {
    name: string;
    profileImage: string | null;
  };
}

interface LeaderboardProps {
  submissions: Submission[];
}

export function Leaderboard({ submissions }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions.slice(0, 5).map((submission) => (
            <div key={submission.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={submission.user.profileImage || undefined} />
                <AvatarFallback>
                  {submission.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{submission.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  Submitted {formatDistanceToNow(submission.createdAt, { addSuffix: true })}
                </p>
              </div>
              <div className="aspect-video w-24 rounded-lg overflow-hidden">
                <video
                  src={submission.videoUrl}
                  className="w-full h-full object-cover"
                  poster="/placeholder.png"
                />
              </div>
            </div>
          ))}
          {submissions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No submissions yet. Be the first to submit!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 