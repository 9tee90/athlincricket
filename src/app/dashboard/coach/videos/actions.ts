'use server'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function uploadVideo(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;

  if (!title || !url) {
    return { success: false, error: "Title and URL are required" };
  }

  try {
    await prisma.video.create({
      data: {
        title,
        description,
        url,
        coach: {
          connect: { id: session.user.id }
        }
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error uploading video:", error);
    return { success: false, error: "Failed to upload video" };
  }
}

export async function deleteVideo(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const videoId = formData.get("videoId") as string;

  if (!videoId) {
    return { success: false, error: "Video ID is required" };
  }

  try {
    await prisma.video.delete({
      where: { id: videoId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting video:", error);
    return { success: false, error: "Failed to delete video" };
  }
} 