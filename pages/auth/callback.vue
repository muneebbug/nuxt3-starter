<template>
  <div class="flex justify-center items-center">
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
          Failed to login
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

    <Loader2
      v-else
      class="w-12 h-12 animate-spin"
    />
  </div>
</template>

<script setup>
import { Loader2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
})
</script>
