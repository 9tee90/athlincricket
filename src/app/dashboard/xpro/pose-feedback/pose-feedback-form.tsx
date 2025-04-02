'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface PoseFeedbackFormProps {
  submissionId: string;
}

export function PoseFeedbackForm({ submissionId }: PoseFeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  
  const submitFeedback = api.submissions.poseFeedback.useMutation({
    onSuccess: () => {
      toast.success("Feedback submitted successfully!");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to submit feedback. Please try again.");
    },
  });

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please enter feedback before submitting");
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
        placeholder="Enter pose feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="mb-4"
      />
      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={submitFeedback.status === "pending" || !feedback.trim()}
      >
        {submitFeedback.status === "pending" ? 'Submitting...' : 'Mark as Reviewed'}
      </Button>
    </div>
  );
} 