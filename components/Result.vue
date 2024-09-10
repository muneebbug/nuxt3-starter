<template>
  <div class="flex flex-col items-center justify-center p-8 text-center">
    <div class="mb-4 text-6xl">
      <Icon :name="getIconName" />
    </div>
    <h2 class="text-2xl font-bold mb-2">
      {{ title }}
    </h2>
    <p class="text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    validator: value => ['error', '500', 'info', 'success', 'warning', '404', '403', '418'].includes(value),
    default: 'info',
  },
  title: {
    type: String,
    default: 'Result',
  },
  description: {
    type: String,
    default: '',
  },
})

const getIconName = computed(() => {
  switch (props.status) {
    case 'error':
    case '500':
      return 'emojione:red-circle'
    case 'info':
      return 'emojione:information'
    case 'success':
      return 'emojione:white-heavy-check-mark'
    case 'warning':
      return 'emojione:warning'
    case '404':
      return 'emojione:confused-face'
    case '403':
      return 'emojione:prohibited'
    case '418':
      return 'emojione:teapot'
    default:
      return 'emojione:information'
  }
})
</script>
