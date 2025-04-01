import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

const f = createUploadthing();

export const uploadRouter = {
  videoUploader: f({ video: { maxFileSize: '512MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user || session.user.role !== 'xpro') {
        throw new Error('Unauthorized');
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter; 