'use client';

import { Button } from '@/components/ui/button';
import { ChallengeCategory, ChallengeFormData } from '@/types';

interface Step4ReviewProps {
  formData: ChallengeFormData;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step4Review({
  formData,
  onSubmit,
  onBack,
}: Step4ReviewProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Category</h3>
          <p className="mt-1 text-sm text-gray-900">
            {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Title</h3>
          <p className="mt-1 text-sm text-gray-900">{formData.title}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
            {formData.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Video</h3>
          <div className="mt-1">
            <video
              src={formData.videoUrl}
              controls
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
          <p className="mt-1 text-sm text-gray-900">
            {formData.deadline.toLocaleDateString()}
          </p>
        </div>

        {formData.reward && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Reward</h3>
            <p className="mt-1 text-sm text-gray-900">{formData.reward}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Publish Challenge</Button>
      </div>
    </form>
  );
} 