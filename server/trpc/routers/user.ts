import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const userRouter = router({
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        picture: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.data?.userId
      const user = await ctx.auth.adapter.source.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name,
          picture: input.picture,
        },
      })
      return user
    }),
})
