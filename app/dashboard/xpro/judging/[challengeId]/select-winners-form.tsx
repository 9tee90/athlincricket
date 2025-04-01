"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface SelectWinnersFormProps {
  challengeId: string;
  submissions: {
    id: string;
    user: {
      name: string;
    };
    videoUrl: string;
    createdAt: Date;
  }[];
}

export function SelectWinnersForm({ challengeId, submissions }: SelectWinnersFormProps) {
  const router = useRouter();
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/challenges/${challengeId}/winners`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winnerIds: selectedWinners,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to select winners");
      }

      toast.success("Winners selected successfully!");
      router.push("/dashboard/xpro/judging");
    } catch (error) {
      toast.error("Failed to select winners. Please try again.");
    } finally {
      setIsSubmitting(false);
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
              />
            </div>
            <div className="mt-2">
              <p className="font-medium">{submission.user.name}</p>
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
            disabled={isSubmitting || selectedWinners.length === 0}
          >
            {isSubmitting ? "Saving..." : "Confirm Winners"}
          </Button>
        </div>
      </div>
    </>
  );
} 