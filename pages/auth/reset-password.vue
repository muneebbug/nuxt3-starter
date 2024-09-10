<template>
  <div>
    <div
      v-if="success"
    >
      <div class="text-center">
        <Icon
          name="ph:check-circle-fill"
          class="text-green-500 mb-2"
          size="64px"
        />
        <p class="text-2xl font-semibold mb-1">
          Done
        </p>
        <p class="text-gray-500 mb-4">
          Your password is successfully reset
        </p>
        <Button
          to="/auth/login"
        >
          Go back to login
        </Button>
      </div>
    </div>

    <div
      v-else-if="failure"
      class="text-center"
    >
      <Icon
        name="oui:cross-in-circle-filled"
        class="text-red-500 mb-2"
        size="64px"
      />
      <p class="text-2xl font-semibold mb-1">
        Failed to reset password
      </p>
      <p class="text-gray-500 mb-4">
        You do not have permission
      </p>
      <Button
        to="/auth/login"
      >
        Go back to login
      </Button>
    </div>

    <div v-else>
      <form
        class="space-y-6 mb-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem v-auto-animate="{ duration: 100 }">
            <FormLabel>
              Password
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                v-bind="componentField"
                @input="validateField('password')"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="passwordConfirm"
        >
          <FormItem v-auto-animate="{ duration: 100 }">
            <FormLabel>
              <span>
                Confirm Password
              </span>
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                v-bind="componentField"
                @input="validateField('passwordConfirm')"
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
            Reset password
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script  setup lang="ts">
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

const formSchema = z.object({
  password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
  passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
})

type ResetPasswordForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting, validateField } = useForm<ResetPasswordForm>({
  validationSchema: toTypedSchema(formSchema),
})

const { resetPassword } = useAuth()

const success = ref(false)
const failure = ref(false)

const onSubmit = handleSubmit(async (values) => {
  await resetPassword(values.password)
    .then(() => { success.value = true })
    .catch(() => { failure.value = true })
})

definePageMeta({
  middleware: 'guest',
  layout: 'auth',
})
</script>
