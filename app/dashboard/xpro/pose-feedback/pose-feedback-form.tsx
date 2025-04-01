'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

interface PoseFeedbackFormProps {
  submissionId: string;
}

export function PoseFeedbackForm({ submissionId }: PoseFeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/submissions/${submissionId}/pose-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          poseFeedback: feedback,
          poseReviewed: true,
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting || !feedback.trim()}
      >
        {isSubmitting ? 'Submitting...' : 'Mark as Reviewed'}
      </Button>
    </div>
  );
} 