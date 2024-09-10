<template>
  <form
    class="space-y-6 mb-4"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="currentPassword"
    >
      <FormItem v-auto-animate="{ duration: 100 }">
        <FormLabel>Current Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Current password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="newPassword"
    >
      <FormItem v-auto-animate="{ duration: 100 }">
        <FormLabel>New Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="New password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="space-x-2">
      <Button
        type="button"
        variant="outline"
        @click="() => resetForm()"
      >
        Reset
      </Button>
      <Button
        type="submit"
        :loading="isSubmitting"
      >
        Save
      </Button>
    </div>
  </form>
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
  currentPassword: z.string({ message: 'Current password is required' }),
  newPassword: z.string({ message: 'New password is required' }),
})

type ChangePasswordForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting, resetForm, setFieldError } = useForm<ChangePasswordForm>({
  validationSchema: toTypedSchema(formSchema),
})

const { changePassword } = useAuth()

const apiErrors = ref({
  wrongPassword: false,
})

const onSubmit = handleSubmit(async (values) => {
  await changePassword(values).catch((error) => {
    if (error.data.message === 'Wrong password') {
      apiErrors.value.wrongPassword = true
      setFieldError('currentPassword', 'Wrong password')
    }
  })
})
</script>
