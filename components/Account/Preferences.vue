<template>
  <Select v-model="colorMode.preference">
    <SelectTrigger class="w-full">
      <SelectValue placeholder="Color Mode" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Color Mode</SelectLabel>
        <SelectItem
          v-for="option in colorModeSelectOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const colorMode = useColorMode()

const colorModeSelectOptions = ref([
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'System',
    value: 'system',
  },
])
</script>
