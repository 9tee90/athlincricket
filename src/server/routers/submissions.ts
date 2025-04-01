import { z } from 'zod';
import { router, xProProcedure } from '../trpc';

export const submissionsRouter = router({
  poseFeedback: xProProcedure
    .input(
      z.object({
        submissionId: z.string(),
        feedback: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { submissionId, feedback } = input;

      const submission = await ctx.db.submission.findUnique({
        where: {
          id: submissionId,
        },
        include: {
          challenge: true,
        },
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      if (submission.challenge.creatorId !== ctx.session.user.id) {
        throw new Error("Not authorized to provide feedback");
      }

      await ctx.db.submission.update({
        where: {
          id: submissionId,
        },
        data: {
          poseFeedback: feedback,
        },
      });

      return { success: true };
    }),
}); 