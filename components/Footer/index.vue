<template>
  <footer
    class="text-gray-500"
  >
    <NuxtLink
      :to="homepage"
      target="_blank"
      external
    >
      <span class="flex gap-1 items-start">
        <Icon
          name="ph:house"
          size="18"
        />
        <p class="text-gray-500">Home</p>
      </span>
    </NuxtLink>

    <p class="text-gray-500">
      •
    </p>

    <NuxtLink
      :to="repository"
      target="_blank"
      external
    >
      <span class="flex gap-1 items-start">
        <p class="text-gray-500">v-{{ version }}</p>
      </span>
    </NuxtLink>
  </footer>
</template>

<script setup>
import { version, repository, homepage } from '../../package.json'
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
