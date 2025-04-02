import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const f = createUploadthing();

export const uploadRouter = {
  videoUploader: f({ video: { maxFileSize: '512MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      if (!session.user.role || !["xpro", "player"].includes(session.user.role)) {
        throw new Error("Only XPros and Players can upload videos");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter; 