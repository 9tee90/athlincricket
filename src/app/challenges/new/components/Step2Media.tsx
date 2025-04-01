'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadButton } from '@/components/ui/upload-button';
import { ChallengeFormData, UploadThingResponse } from '@/types';

interface Step2MediaProps {
  formData: Pick<ChallengeFormData, 'description' | 'videoUrl'>;
  onUpdate: (data: Pick<ChallengeFormData, 'description' | 'videoUrl'>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Media({
  formData,
  onUpdate,
  onNext,
  onBack,
}: Step2MediaProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Challenge Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => onUpdate({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Describe your challenge, including rules and judging criteria..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Challenge Video
        </label>
        <div className="mt-1">
          <UploadButton
            endpoint="videoUploader"
            onClientUploadComplete={(res: UploadThingResponse[]) => {
              if (res?.[0]?.fileUrl) {
                onUpdate({ ...formData, videoUrl: res[0].fileUrl });
              }
              setIsUploading(false);
            }}
            onUploadError={(error: Error) => {
              console.error('Upload error:', error);
              setIsUploading(false);
            }}
            onUploadBegin={() => setIsUploading(true)}
            className="ut-button:bg-blue-600 ut-button:text-white ut-button:hover:bg-blue-700"
          />
          {formData.videoUrl && (
            <div className="mt-2 text-sm text-green-600">
              Video uploaded successfully!
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={!formData.videoUrl || isUploading}>
          Next
        </Button>
      </div>
    </form>
  );
} 