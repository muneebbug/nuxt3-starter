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
          Email verification sent
        </p>
        <p class="text-gray-500 mb-4">
          Please check your inbox for a verification link
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
          name="firstName"
        >
          <FormItem v-auto-animate="{ duration: 100 }">
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="John"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="lastName"
        >
          <FormItem v-auto-animate="{ duration: 100 }">
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Doe"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
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
            Register
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
            Register with Google
          </Button>
        </div>
      </form>
      <Separator
        class="my-8"
        label="Already have an account?"
      />
      <Button
        to="/auth/login"
        variant="outline"
        class="w-full"
      >
        Login
      </Button>
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
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
  // passwordConfirm must be the same as password
  passwordConfirm: z.string(),
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string({ message: 'Last name is required' }),
}).refine(data => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
})

type RegisterForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting, setFieldError, validateField } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(formSchema),
})

const { register, requestEmailVerify, loginWithProvider } = useAuth()
const success = ref(false)

const apiErrors = ref({
  emailAlreadyExists: false,
})

const onSubmit = handleSubmit(async (values) => {
  await register({
    email: values.email,
    password: values.password,
    name: values.firstName + ' ' + values.lastName,
  }).then(async () => {
    await requestEmailVerify(values.email)
    success.value = true
  }).catch(async (error) => {
    // Check if the error is due to email already being used
    if (error.data.message === 'Email already used') {
      apiErrors.value.emailAlreadyExists = true
      setFieldError('email', 'This email is already registered')
    }
    else if (error.data.message === 'Account not verified') {
      // If the account is not verified, request email verification
      await requestEmailVerify(values.email)
      success.value = true
    }
    else {
      // Handle other errors as needed
      console.error('Unexpected error:', error)
    }
  })
})

definePageMeta({
  middleware: 'guest',
  layout: 'auth',
})
</script>
