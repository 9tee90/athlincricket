"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useSession } from "next-auth/react";

interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
  endpoint: keyof OurFileRouter;
}

const { UploadButton: UTButton } = generateComponents<OurFileRouter>();

export function UploadButton({ onUploadComplete, endpoint }: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Button disabled className="w-full">
        Please sign in to upload
      </Button>
    );
  }

  return (
    <UTButton
      endpoint={endpoint}
      onUploadBegin={() => setIsUploading(true)}
      onClientUploadComplete={(res) => {
        setIsUploading(false);
        if (res?.[0]?.url) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(err: Error) => {
        setIsUploading(false);
        console.error(err);
      }}
      appearance={{
        button: "w-full",
        allowedContent: "hidden"
      }}
    />
  );
} 