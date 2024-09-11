import { router } from './trpc'
import { incrementRouter } from './routers/increment'

export const appRouter = router({
  increment: incrementRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
