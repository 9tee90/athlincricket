import type { FileRouter } from "uploadthing/next";

export type OurFileRouter = {
  videoUploader: {
    maxFileSize: "512MB";
    maxFileCount: 1;
  };
} satisfies FileRouter; 