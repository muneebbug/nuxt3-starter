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
    <span
      :class="props.loading ? 'opacity-100' : 'opacity-0'"
      class="absolute inset-0 flex items-center justify-center"
    >
      <Loader2
        class="h-4 w-4 animate-spin"
      />
    </span>
    <span :class="props.loading ? 'opacity-0' : 'opacity-100'">
      <slot />
    </span>
  </Primitive>
</template>
