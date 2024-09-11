import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const incrementRouter = router({
  unauthenticated: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        result: `Button was clicked ${input?.text} times`,
      }
    }),
  authenticated: protectedProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        result: `Button was clicked ${
          input?.text
        } times (server authenticated this request)`,
      }
    }),
})
