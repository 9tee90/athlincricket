'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { TRPCClientErrorLike } from "@trpc/client";
import { DefaultErrorShape } from "@trpc/server";

interface PoseFeedbackFormProps {
  submissionId: string;
  initialFeedback?: string | null;
}

export function PoseFeedbackForm({ submissionId, initialFeedback }: PoseFeedbackFormProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState(initialFeedback || "");
  
  const submitFeedback = api.submissions.poseFeedback.useMutation({
    onSuccess: () => {
      toast.success("Feedback submitted successfully!");
      router.replace("/dashboard/xpro/pose-feedback");
    },
    onError: (error: TRPCClientErrorLike<DefaultErrorShape>) => {
      toast.error(error.message || "Failed to submit feedback. Please try again.");
    },
  });

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please provide feedback");
      return;
    }

    try {
      submitFeedback.mutate({
        submissionId,
        feedback: feedback.trim(),
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback here..."
        className="min-h-[200px]"
      />
      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={submitFeedback.status === "loading" || !feedback.trim()}
      >
        {submitFeedback.status === "loading" ? 'Submitting...' : 'Mark as Reviewed'}
      </Button>
    </div>
  );
} 