import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadthingConfig = {
  courseVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } }),
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }),
  challengeVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } }),
  submissionVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } }),
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }),
  sponsorImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadthingConfig; 