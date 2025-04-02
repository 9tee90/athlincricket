'use server'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function invitePlayer(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    // Check if the player already exists
    const existingPlayer = await prisma.user.findUnique({
      where: { email },
    });

    if (existingPlayer) {
      // If player exists, update their coach
      await prisma.user.update({
        where: { id: existingPlayer.id },
        data: {
          coachedBy: {
            connect: { id: session.user.id }
          }
        },
      });
    } else {
      // If player doesn't exist, create a new user with a temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "player",
          coachedBy: {
            connect: { id: session.user.id }
          }
        },
      });

      // TODO: Send invitation email with temporary password
    }

    return { success: true };
  } catch (error) {
    console.error("Error inviting player:", error);
    return { success: false, error: "Failed to invite player" };
  }
}

export async function removePlayer(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "coach") {
    redirect("/unauthorized");
  }

  const playerId = formData.get("playerId") as string;

  if (!playerId) {
    return { success: false, error: "Player ID is required" };
  }

  try {
    await prisma.user.update({
      where: { id: playerId },
      data: {
        coachedBy: {
          disconnect: { id: session.user.id }
        }
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error removing player:", error);
    return { success: false, error: "Failed to remove player" };
  }
} 