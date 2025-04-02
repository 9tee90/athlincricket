import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth();
  return {
    session,
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ next }) => {
  const session = await auth();
  if (!session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({
    ctx: {
      session,
      db,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

const isXPro = t.middleware(async ({ next }) => {
  const session = await auth();
  if (!session?.user || session.user.role !== 'xpro') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not authorized' });
  }
  return next({
    ctx: {
      session,
      db,
    },
  });
});

export const xProProcedure = t.procedure.use(isXPro); 