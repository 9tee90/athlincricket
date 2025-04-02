import { prisma } from "./prisma";

export async function getChecklistStatus(userId: string) {
  const coach = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      videos: true,
      invitedPlayers: true,
    },
  });

  if (!coach) {
    throw new Error("Coach not found");
  }

  return {
    uploadedVideos: coach.videos.length >= 3,
    invitedPlayers: coach.invitedPlayers.length >= 3,
    verifiedCert: coach.isVerifiedCoach === true,
  };
} 