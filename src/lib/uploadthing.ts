import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { generateReactHelpers } from "@uploadthing/react";

const f = createUploadthing();

export const uploadRouter = {
  videoUploader: f({ video: { maxFileSize: '512MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        throw new Error('Unauthorized');
      }

      if (!['xpro', 'player'].includes(session.user.role)) {
        throw new Error('Only players and xpros can upload videos');
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>(); 