"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/route";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface UploadButtonProps {
  onSuccess: (url: string) => void;
  isUploading?: boolean;
}

export function UploadButton({
  onSuccess,
  isUploading = false,
}: UploadButtonProps) {
  const { startUpload, isUploading: isUploadingFile } = useUploadThing("videoUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        onSuccess(res[0].url);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await startUpload([file]);
    }
  }, [startUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-sm text-muted-foreground">Drop the video here</p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Drag & drop a video here, or click to select one
          </p>
          <Button
            type="button"
            disabled={isUploading || isUploadingFile}
            className="w-full sm:w-auto"
          >
            {isUploading || isUploadingFile ? "Uploading..." : "Select Video"}
          </Button>
        </div>
      )}
    </div>
  );
} 