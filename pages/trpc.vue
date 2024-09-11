<template>
  <div class="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Public Request</CardTitle>
        <CardDescription>
          This is an example of unauthenticated request
        </CardDescription>
      </CardHeader>
      <CardContent>
        {{ hello?.result }}
      </CardContent>
      <CardFooter>
        <Button
          :loading="queryStatus === 'pending'"
          :disabled="queryStatus === 'pending'"
          @click="() => increment()"
        >
          increment public
        </Button>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Authenticated Request</CardTitle>
        <CardDescription>
          This is an example of authenticated request
        </CardDescription>
      </CardHeader>
      <CardContent>
        {{ helloAuth?.result }}
      </CardContent>
      <CardFooter>
        <Button
          :loading="authQueryStatus === 'pending'"
          :disabled="authQueryStatus === 'pending'"
          @click="() => incrementAuth()"
        >
          Authenticated Increment
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const { $client } = useNuxtApp()
const count = useState('count', () => 0)
const countAuthed = useState('countAuth', () => 0)
// async trpc state
const { data: hello, status: queryStatus } = await useAsyncData(
  () =>
    $client.increment.unauthenticated.query({
      text: `#${count.value}`,
    }),
  { watch: [count] },
)
const { data: helloAuth, status: authQueryStatus } = await useAsyncData(
  () =>
    $client.increment.authenticated.query({
      text: `#${countAuthed.value}`,
    }),
  { watch: [countAuthed] },
)

// methods
const increment = () => {
  count.value++
}
const incrementAuth = () => {
  countAuthed.value++
}
</script>

<style scoped>
.auth,
.test-handles {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
</style>
