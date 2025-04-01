'use client';

import { UploadButton as UTUploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/lib/uploadthing';

interface UploadButtonProps {
  endpoint: keyof OurFileRouter;
  onClientUploadComplete?: (res: any[]) => void;
  onUploadError?: (error: Error) => void;
  onUploadBegin?: () => void;
  className?: string;
}

export function UploadButton({
  endpoint,
  onClientUploadComplete,
  onUploadError,
  onUploadBegin,
  className,
}: UploadButtonProps) {
  return (
    <UTUploadButton
      endpoint={endpoint}
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      onUploadBegin={onUploadBegin}
      className={className}
    />
  );
} 