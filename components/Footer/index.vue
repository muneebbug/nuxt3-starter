<template>
  <footer
    :style="{ backgroundColor: naiveTheme.bodyColor }"
    class="text-gray-500"
  >
    <nuxt-link
      :to="homepage"
      target="_blank"
    >
      <span class="flex gap-1 items-start">
        <naive-icon
          name="ph:house"
          :size="18"
        />
        <p class="text-gray-500">Home</p>
      </span>
    </nuxt-link>

    <p class="text-gray-500">
      •
    </p>

    <nuxt-link
      :to="repository"
      target="_blank"
    >
      <span class="flex gap-1 items-start">
        <p class="text-gray-500">v-{{ version }}</p>
      </span>
    </nuxt-link>
  </footer>
</template>

<script setup>
import { version, repository, homepage } from '../../package.json'

const naiveTheme = useThemeVars()
</script>

<style scoped>
footer {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
}
</style>
