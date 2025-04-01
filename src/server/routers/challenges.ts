import { z } from 'zod';
import { router, publicProcedure, xProProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const challengesRouter = router({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const challenge = await ctx.db.challenge.findUnique({
        where: { id: input.id },
        include: {
          creator: {
            select: {
              name: true,
              image: true,
            },
          },
          sponsor: {
            select: {
              name: true,
              image: true,
            },
          },
          submissions: {
            where: {
              winner: true,
            },
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      return challenge;
    }),

  getForJudging: xProProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const challenge = await ctx.db.challenge.findUnique({
        where: {
          id: input.id,
          creatorId: ctx.session.user.id,
          status: "active",
          deadline: {
            lt: new Date(),
          },
        },
        include: {
          submissions: {
            where: {
              winner: false,
            },
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found or not ready for judging',
        });
      }

      return challenge;
    }),
}); 