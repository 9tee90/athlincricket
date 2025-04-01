import { z } from 'zod';
import { router, xProProcedure } from '../trpc';

export const winnersRouter = router({
  select: xProProcedure
    .input(
      z.object({
        challengeId: z.string(),
        winnerIds: z.array(z.string()).min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { challengeId, winnerIds } = input;

      // Verify the challenge belongs to the X-Pro
      const challenge = await ctx.db.challenge.findUnique({
        where: {
          id: challengeId,
          creatorId: ctx.session.user.id,
          status: "active",
          deadline: {
            lt: new Date(),
          },
        },
      });

      if (!challenge) {
        throw new Error("Challenge not found");
      }

      // Update submissions to mark winners
      await ctx.db.submission.updateMany({
        where: {
          id: {
            in: winnerIds,
          },
          challengeId: challengeId,
        },
        data: {
          winner: true,
        },
      });

      // Update challenge status to closed
      await ctx.db.challenge.update({
        where: {
          id: challengeId,
        },
        data: {
          status: "closed",
        },
      });

      return { success: true };
    }),
}); 