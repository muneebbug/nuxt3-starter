<template>
  <div class="page justify-center items-center">
    <Result
      :status="status"
      :title="error.statusMessage || 'Oops, something went wrong'"
      :description="error.message"
    />
    <Button
      @click="handleError"
    >
      Back home
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { Button } from '@/components/ui/button'

const props = defineProps<{ error: NuxtError }>()

const status = computed(() => props.error.statusCode?.toString())
const handleError = () => clearError({ redirect: '/' })
</script>
