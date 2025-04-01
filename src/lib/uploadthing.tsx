"use client";

import React from "react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { Button } from "@nextui-org/react";

const { useUploadThing } = generateReactHelpers();

interface UploadButtonProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

export function UploadButton({
  onUploadComplete,
  onUploadError,
}: UploadButtonProps) {
  const { startUpload, isUploading } = useUploadThing("videoUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        onUploadComplete?.(res[0].url);
      }
    },
    onUploadError: (error: Error) => {
      onUploadError?.(error);
    },
  });

  return (
    <Button
      variant="bordered"
      isDisabled={isUploading}
      fullWidth
      as="label"
      className="cursor-pointer"
    >
      {isUploading ? "Uploading..." : "Select Video"}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            startUpload([file]);
          }
        }}
        className="hidden"
      />
    </Button>
  );
} 