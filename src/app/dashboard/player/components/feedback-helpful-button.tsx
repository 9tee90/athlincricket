'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FeedbackHelpfulButtonProps {
  submissionId: string;
}

export function FeedbackHelpfulButton({ submissionId }: FeedbackHelpfulButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    try {
      setIsSubmitting(true);
      await fetch(`/api/submissions/${submissionId}/feedback-helpful`, {
        method: 'POST',
      });
      // The button will be removed from the UI after a page refresh
    } catch (error) {
      console.error('Error marking feedback as helpful:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      onClick={handleClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'This helped me'}
    </Button>
  );
} 