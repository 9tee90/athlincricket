'use client';

import { Button } from '@/components/ui/button';
import { ChallengeFormData } from '@/types';

interface Step3DeadlineProps {
  formData: Pick<ChallengeFormData, 'deadline' | 'reward'>;
  onUpdate: (data: Pick<ChallengeFormData, 'deadline' | 'reward'>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Deadline({
  formData,
  onUpdate,
  onNext,
  onBack,
}: Step3DeadlineProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700"
        >
          Challenge Deadline
        </label>
        <input
          type="date"
          id="deadline"
          value={formData.deadline.toISOString().split('T')[0]}
          onChange={(e) =>
            onUpdate({ ...formData, deadline: new Date(e.target.value) })
          }
          min={minDate}
          max={maxDate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Select a date between today and 30 days from now
        </p>
      </div>

      <div>
        <label
          htmlFor="reward"
          className="block text-sm font-medium text-gray-700"
        >
          Challenge Reward (Optional)
        </label>
        <input
          type="text"
          id="reward"
          value={formData.reward || ''}
          onChange={(e) => onUpdate({ ...formData, reward: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., 1:1 call, social shoutout, etc."
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
} 