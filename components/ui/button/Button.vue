<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { Loader2 } from 'lucide-vue-next'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :to="to"
  >
    <slot />
  </NuxtLink>
  <Primitive
    v-else
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <Loader2
      v-if="loading"
      class="h-4 w-4 animate-spin"
    />
    <slot v-else />
  </Primitive>
</template>
