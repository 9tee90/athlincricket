import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";
import { generateReactHelpers } from "@uploadthing/react";

const f = createUploadthing();

// Types for role-based upload permissions
type UploadPermissions = {
  [K in "video" | "image"]: {
    roles: string[];
    maxFileSize: string;
    maxFileCount: number;
  };
};

const uploadPermissions: UploadPermissions = {
  video: {
    roles: ["coach", "admin", "xpro", "player"],
    maxFileSize: "512MB",
    maxFileCount: 1,
  },
  image: {
    roles: ["coach", "admin", "sponsor", "xpro", "player"],
    maxFileSize: "4MB",
    maxFileCount: 1,
  },
};

// FileRouter for your app
export const uploadRouter = {
  // Course-related uploads
  courseVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      if (!["coach", "admin"].includes(session.user.role)) {
        throw new Error("Only coaches and admins can upload course videos");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),

  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      if (!["coach", "admin"].includes(session.user.role)) {
        throw new Error("Only coaches and admins can upload course images");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),

  // Challenge-related uploads
  challengeVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      if (!["xpro", "admin"].includes(session.user.role)) {
        throw new Error("Only XPros and admins can upload challenge videos");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),

  // Submission-related uploads
  submissionVideo: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      if (!["player", "admin"].includes(session.user.role)) {
        throw new Error("Only players and admins can upload submission videos");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),

  // Profile-related uploads
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),

  // Sponsor-related uploads
  sponsorImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      if (!["sponsor", "admin"].includes(session.user.role)) {
        throw new Error("Only sponsors and admins can upload sponsor images");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

// Export the React hooks
export const { useUploadThing } = generateReactHelpers<OurFileRouter>(); 