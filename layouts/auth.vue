<template>
  <div class="page">
    <div class="flex-1 flex">
      <div class="md:w-1/3 w-full flex flex-col justify-between">
        <div class="px-8 mt-10">
          <p class="text-lg font-semibold">
            Nuxt starter
          </p>
          <p
            class="text-lg"
            :depth="2"
          >
            {{ title }}
          </p>
        </div>

        <div class="px-8 py-4 max-w-sm mx-auto w-full">
          <slot />
        </div>

        <div>
          <Footer />
        </div>
      </div>

      <div class="w-2/3 hidden md:block bg-gradient-to-r from-cyan-500 to-blue-500" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const title = computed(() => {
  switch (route.name) {
    case 'auth-login':
      return 'Login to your account'

    case 'auth-register':
      return 'Create your account'

    case 'auth-request-password-reset':
      return 'Request password reset'

    case 'auth-reset-password':
      return 'Reset your password'

    case 'auth-verify-email':
      return 'Email verification'

    case 'auth-callback':
      return 'Social login'
    default:
      return ''
  }
})
</script>
