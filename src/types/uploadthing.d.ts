import type { FileRouter } from "uploadthing/next";

export type OurFileRouter = FileRouter & {
  videoUploader: {
    maxFileSize: "512MB";
    maxFileCount: 1;
  };
}; 