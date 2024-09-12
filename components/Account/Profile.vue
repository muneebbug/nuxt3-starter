<template>
  <div>
    <form
      class="space-y-6 mb-4"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="file"
      >
        <FormItem v-auto-animate="{ duration: 100 }">
          <FormControl>
            <div
              class="relative cursor-pointer group max-w-fit mx-auto"
              @click="handleAvatarClick"
            >
              <div class="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden">
                <img
                  v-if="values.picture"
                  :src="values.picture"
                  alt="Profile"
                  class="w-full h-full object-cover"
                >
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-gray-100"
                >
                  <User class="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera class="w-8 h-8 text-white" />
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              v-bind="componentField"
              @change="handleImageChange($event)"
            >
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="name"
      >
        <FormItem v-auto-animate="{ duration: 100 }">
          <FormLabel>Name</FormLabel>
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
          Update profile
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { User, Camera } from 'lucide-vue-next'
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
  name: z.string({ message: 'Name is required' }),
  picture: z.string({ message: 'Picture is required' }),
  file: z.custom<File | null>((file) => {
    if (file && !(file instanceof File)) {
      console.error('File is not an instance of File')
      return false
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']
    return file ? validImageTypes.includes(file.type) : true
  }, { message: 'File must be an image (jpeg, png, gif)' }),
})

type ChangeProfileForm = z.infer<typeof formSchema>

const { user } = useAuthSession()
const { upload } = useS3Object()
const { fetchUser } = useAuth()

const { handleSubmit, isSubmitting, resetForm, values, setValues, setFieldValue } = useForm<ChangeProfileForm>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    name: user.value?.name,
    picture: user.value?.picture,
  },
})

const fileInput = ref<HTMLInputElement | null>(null)
const handleAvatarClick = () => {
  fileInput.value?.click()
}
const handleImageChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onloadend = () => {
    setFieldValue('picture', reader.result as string)
  }

  reader.readAsDataURL(file)
}
const onSubmit = handleSubmit(async (values) => {
  if (values.file) {
    const url = await upload(values.file, {
      url: values.picture,
      prefix: `${user.value!.id}/`,
      meta: {
        'user-id': user.value!.id,
      },
    })

    values.picture = url
  }

  await useNuxtApp().$auth.fetch('/api/user', {
    method: 'patch',
    body: {
      name: values.name,
      picture: values.picture,
    },
  })

  await fetchUser()
  setValues({
    name: user.value?.name,
    picture: user.value?.picture,
    file: null,
  })
})
</script>
