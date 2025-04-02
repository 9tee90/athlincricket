import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { generateReactHelpers } from "@uploadthing/react";

const f = createUploadthing();

export const ourFileRouter = {
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
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>(); 