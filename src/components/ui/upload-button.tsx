"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing-client";

interface UploadButtonProps {
  onSuccess: (url: string) => void;
}

export function UploadButton({ onSuccess }: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("videoUploader");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const res = await startUpload([file]);
      if (res?.[0]?.url) {
        onSuccess(res[0].url);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="video/*"
        onChange={handleUpload}
        className="hidden"
        id="video-upload"
      />
      <label htmlFor="video-upload">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload Video"}
        </Button>
      </label>
    </div>
  );
} 