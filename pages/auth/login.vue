<template>
  <div>
    <form
      class="space-y-6 mb-4"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem v-auto-animate="{ duration: 100 }">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="abc@gmail.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem v-auto-animate="{ duration: 100 }">
          <FormLabel>
            <span>
              Password
            </span>
            <NuxtLink
              to="/auth/request-password-reset"
              class="float-end font-normal text-sm text-primary"
            >
              <span>
                Forgot password?
              </span>
            </NuxtLink>
          </FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="space-y-2">
        <Button
          class="w-full"
          type="submit"
          :loading="isSubmitting"
        >
          Login
        </Button>
        <Button
          type="button"
          variant="outline"
          class="w-full"
          @click="loginWithProvider('google')"
        >
          <Icon
            name="logos:google-icon"
            class="mr-2 w-4 h-4"
          />
          Login with Google
        </Button>
      </div>
    </form>
    <Separator
      class="my-8"
      label="Or"
    />
    <Button
      to="/auth/register"
      variant="outline"
      class="w-full"
    >
      Create an account
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
})

type LoginForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting } = useForm<LoginForm>({
  validationSchema: toTypedSchema(formSchema),
})

definePageMeta({
  layout: 'auth',
})

const { login, loginWithProvider } = useAuth()

const apiErrors = ref({
  wrongCredentials: false,
  invalidProvider: false,
  accountNotVerified: false,
  accountSuspended: false,
})

const onSubmit = handleSubmit(async (values) => {
  await login({
    email: values.email,
    password: values.password,
  }).catch((error) => {
    apiErrors.value.wrongCredentials = error.data.message === 'Wrong credentials'
    apiErrors.value.accountNotVerified = error.data.message === 'Account not verified'
    apiErrors.value.accountSuspended = error.data.message === 'Account suspended'
  })
})
</script>
