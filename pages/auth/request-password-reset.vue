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
          We've sent you a secure link to reset your password
        </p>
        <Button
          to="/auth/login"
        >
          Go back to login
        </Button>
      </div>
    </div>

    <div v-else>
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

        <Button
          class="w-full"
          type="submit"
          :loading="isSubmitting"
        >
          Request password reset
        </Button>
      </form>
    </div>
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

const formSchema = z.object({
  email: z.string({ message: 'Please input your email' }).email({ message: 'Invalid email' }),
})

type RequestPasswordResetForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting } = useForm<RequestPasswordResetForm>({
  validationSchema: toTypedSchema(formSchema),
})

definePageMeta({
  middleware: 'guest',
  layout: 'auth',
})

const { requestPasswordReset } = useAuth()

const success = ref(false)
const onSubmit = handleSubmit(async (values) => {
  await requestPasswordReset(values.email)
  success.value = true
})
</script>
