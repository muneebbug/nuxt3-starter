import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/router'

export default defineNuxtPlugin(() => {
  const { getAccessToken } = useAuthSession()
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        async headers() {
          return {
            Authorization: `Bearer ${await getAccessToken()}`,
          }
        },
      }),
    ],
  })

  return {
    provide: {
      client,
    },
  }
})
