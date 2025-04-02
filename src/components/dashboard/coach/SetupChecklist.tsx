import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type ChecklistProps = {
  checklist: {
    uploadedVideos: boolean;
    invitedPlayers: boolean;
    verifiedCert: boolean;
  };
};

const routes = {
  videos: "/dashboard/coach/videos",
  players: "/dashboard/coach/players",
  certification: "/dashboard/coach/certification",
  newCourse: "/dashboard/coach/courses/new",
} as const;

export default function SetupChecklist({ checklist }: ChecklistProps) {
  const allComplete =
    checklist.uploadedVideos &&
    checklist.invitedPlayers &&
    checklist.verifiedCert;

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-4">
          <ChecklistItem 
            label="Upload at least 3 training videos" 
            complete={checklist.uploadedVideos}
            href={routes.videos}
          />
          <ChecklistItem 
            label="Invite at least 3 players" 
            complete={checklist.invitedPlayers}
            href={routes.players}
          />
          <ChecklistItem 
            label="Verify your coaching certification" 
            complete={checklist.verifiedCert}
            href={routes.certification}
          />
        </div>
      </Card>

      <Button
        disabled={!allComplete}
        className={`w-full ${
          allComplete
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        asChild
      >
        <Link href={allComplete ? routes.newCourse : "#"}>
          {allComplete ? "✅ Create Your First Course" : "🔒 Complete Steps to Unlock"}
        </Link>
      </Button>
    </div>
  );
}

function ChecklistItem({ 
  label, 
  complete, 
  href 
}: { 
  label: string; 
  complete: boolean;
  href: string;
}) {
  return (
    <Link 
      href={href as any}
      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
    >
      <span className={`text-xl ${complete ? "text-green-600" : "text-gray-400"}`}>
        {complete ? "✅" : "⭕"}
      </span>
      <span className={complete ? "text-gray-600" : "text-gray-500"}>{label}</span>
    </Link>
  );
} 