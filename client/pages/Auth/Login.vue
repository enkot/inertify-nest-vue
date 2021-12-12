<script lang="ts">
import Layout from '@/layouts/Empty.vue'

export default {
  layout: Layout
}
</script>

<script setup lang="ts">
import Logo from '@/assets/logo.svg?component'

const form = useForm({
  email: 'tony@stark.com',
  password: 'secret',
  errors: {}
})

defineProps<{
  errors?: {
    auth: string
  }
}>()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
    <div class="text-center sm:mx-auto sm:w-full sm:max-w-md space-y-2">
      <Logo class="inline-block h-10 mb-4" />
      <h2
        class="text-center text-3xl sm:text-4xl font-extrabold text-blue-gray-900 m-0"
      >Welcome to Inertify</h2>
      <span class="inline-block text-gray-500 text-base">
        <span class="font-semibold">CRM</span>
        built on
        <span class="font-semibold">Inertia, Nest, Prisma, Vite, Vue</span>
      </span>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="errors?.auth" class="bg-red-50 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <heroicons-solid-x-circle class="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ errors?.auth }}</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="form.post('/auth/login')" class="space-y-6">
        <Input v-model="form.email" type="text" label="Email" />
        <Input v-model="form.password" type="password" label="Password" />
        <div>
          <Button type="submit" variant="primary" :disabled="form.processing" class="w-full">Sign in</Button>
        </div>
      </form>
    </div>
  </div>
</template>
