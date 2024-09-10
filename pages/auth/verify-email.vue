<template>
  <div>
    <div
      v-if="$route.query.error"
    >
      <div class="text-center">
        <Icon
          name="oui:cross-in-circle-filled"
          class="text-red-500 mb-2"
          size="64px"
        />
        <p class="text-2xl font-semibold mb-1">
          Failed to verify email
        </p>
        <p class="text-gray-500 mb-4">
          {{ $route.query.error.toString() }}
        </p>
        <Button
          to="/auth/login"
        >
          Go back to login
        </Button>
      </div>
    </div>

    <div
      v-else
    >
      <div class="text-center">
        <Icon
          name="ph:check-circle-fill"
          class="text-green-500 mb-2"
          size="64px"
        />
        <p class="text-2xl font-semibold mb-1">
          Your email is confirmed
        </p>
        <p class="text-gray-500 mb-4">
          Registration successfully completed
        </p>
        <Button
          to="/auth/login"
        >
          Go back to login
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'

definePageMeta({
  middleware: 'guest',
  layout: 'auth',
})
</script>
