"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface Submission {
  id: string;
  userId: string;
  user: {
    name: string | null;
  };
  videoUrl: string;
  createdAt: string;
  challengeId: string;
  poseReviewed: boolean;
  poseFeedback: string | null;
  feedbackHelpful: boolean | null;
  winner: boolean;
}

interface SelectWinnersFormProps {
  challengeId: string;
  submissions: Submission[];
}

export function SelectWinnersForm({ challengeId, submissions }: SelectWinnersFormProps) {
  const router = useRouter();
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const selectWinners = api.winners.select.useMutation({
    onSuccess: () => {
      toast.success("Winners selected successfully!");
      router.replace("/dashboard/xpro/judging");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to select winners. Please try again.");
    },
  });

  const handleWinnerToggle = (submissionId: string) => {
    setSelectedWinners((prev) => {
      if (prev.includes(submissionId)) {
        return prev.filter((id) => id !== submissionId);
      }
      if (prev.length >= 3) {
        toast.error("You can only select up to 3 winners");
        return prev;
      }
      return [...prev, submissionId];
    });
  };

  const handleSubmit = async () => {
    if (selectedWinners.length === 0) {
      toast.error("Please select at least one winner");
      return;
    }

    try {
      selectWinners.mutate({
        challengeId,
        winnerIds: selectedWinners,
      });
    } catch (error) {
      console.error("Error selecting winners:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission) => (
          <div key={submission.id} className="relative">
            <div className="absolute top-4 right-4 z-10">
              <Checkbox
                checked={selectedWinners.includes(submission.id)}
                onCheckedChange={() => handleWinnerToggle(submission.id)}
                className="h-6 w-6 border-2"
              />
            </div>
            <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
              <video
                src={submission.videoUrl}
                controls
                className="w-full h-full object-cover"
                preload="metadata"
              />
            </div>
            <div className="mt-2">
              <p className="font-medium">{submission.user.name || "Anonymous"}</p>
              <p className="text-sm text-muted-foreground">
                Submitted {new Date(submission.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedWinners.length} of 3 winners selected
          </div>
          <Button
            onClick={handleSubmit}
            disabled={selectWinners.status === "pending" || selectedWinners.length === 0}
          >
            {selectWinners.status === "pending" ? "Saving..." : "Confirm Winners"}
          </Button>
        </div>
      </div>
    </>
  );
} 