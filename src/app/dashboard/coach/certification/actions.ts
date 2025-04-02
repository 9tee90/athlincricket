'use server'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function verifyCertification() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { isVerifiedCoach: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying certification:", error);
    return { success: false, error: "Failed to verify certification" };
  }
} 