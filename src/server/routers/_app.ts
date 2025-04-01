import { router } from '../trpc';
import { winnersRouter } from './winners';
import { submissionsRouter } from './submissions';
import { challengesRouter } from './challenges';

export const appRouter = router({
  winners: winnersRouter,
  submissions: submissionsRouter,
  challenges: challengesRouter,
});

export type AppRouter = typeof appRouter; 