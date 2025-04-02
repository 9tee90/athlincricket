"use client";

import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/components/ui/upload-button";
import { useToast } from "@/components/ui/use-toast";

interface SubmissionFormProps {
  challengeId: string;
}

export function SubmissionForm({ challengeId }: SubmissionFormProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  if (!session) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Please log in to submit your entry.
        </p>
        <Link href={{ pathname: '/auth/login' }}>
          <Button>Log In to Submit</Button>
        </Link>
      </div>
    );
  }

  if (session.user.role !== "player") {
    return (
      <p className="text-muted-foreground">
        Only players can submit entries to challenges.
      </p>
    );
  }

  const handleUploadSuccess = (url: string) => {
    setVideoUrl(url);
    toast({
      title: "Upload complete",
      description: "Your video has been uploaded successfully.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId,
          videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit entry");
      }

      toast({
        title: "Success!",
        description: "Your entry has been received!",
      });

      redirect("/");
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit your entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <UploadButton
          onUploadComplete={handleUploadSuccess}
          endpoint="submissionVideo"
        />
        {videoUrl && (
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
            />
          </div>
        )}
      </div>
      <Button type="submit" disabled={!videoUrl}>
        Submit Entry
      </Button>
    </form>
  );
} 