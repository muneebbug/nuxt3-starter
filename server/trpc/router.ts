import { router } from './trpc'
import { incrementRouter } from './routers/increment'
import { userRouter } from './routers/user'

export const appRouter = router({
  increment: incrementRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
