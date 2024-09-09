<template>
  <ul class="space-y-2">
    <li
      v-for="session of sessions"
      :key="session.id"
    >
      <div
        class="flex items-center justify-between"
      >
        <Badge
          :class="session.current ? 'bg-green-500' : 'bg-gray-500'"
          :variant="session.current ? 'outline' : 'secondary'"
          size="small"
        >
          {{ session.current ? 'Current' : 'Active' }}
        </Badge>

        <span>
          {{
            [
              session.userAgent && UAParser(session.userAgent).browser.name,
              session.userAgent && UAParser(session.userAgent).os.name,
              session.userAgent && UAParser(session.userAgent).device.model,
            ]
              .join(' ') }}
        </span>
        <Button
          :disabled="session.current"
          class="bg-transparent h-full text-red-500 border border-gray-500"
          @click="() => handleSessionRevoke(session.id)"
        >
          <Icon
            name="ph:trash-simple-light"
            size="18px"
          />
        </Button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { UAParser } from 'ua-parser-js'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const { getAllSessions, revokeSession } = useAuthSession()

const { data: sessions } = await useAsyncData('user-sessions', getAllSessions)

async function handleSessionRevoke(id: string) {
  await revokeSession(id)
  sessions.value = sessions.value!.filter(el => el.id !== id)
}
</script>
