<script setup lang="ts">
defineProps<{
  errors?: Record<string, string>
}>()

const ownerOptions = ref([{ id: false, name: 'No' }, { id: true, name: 'Yes' }])
const form = useForm({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  owner: false,
  photo: null
})
</script>

<template>
  <div>
    <Head title="Create User" />
    <header>
      <div
        class="max-w-4xl md:flex md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 class="flex items-center text-3xl font-bold leading-tight text-gray-800 space-x-1.5">
          <Link href="/users" class="hover:text-violet-700">Users</Link>
          <span class="text-gray-300">/</span>
          <span>Create</span>
        </h1>
      </div>
    </header>
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-6 flex flex-col">
        <form @submit.prevent="form.post('/users')">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="bg-white py-10 px-8 space-y-6">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Primary Information</h3>
                <p class="mt-1 text-sm text-gray-500">Provide basic information about the user.</p>
              </div>

              <div class="grid grid-cols-6 gap-6">
                <Input
                  v-model="form.firstName"
                  label="First name"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.firstName"
                />
                <Input
                  v-model="form.lastName"
                  label="Last name"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.lastName"
                />
                <Input
                  v-model="form.email"
                  label="Email"
                  class="col-span-6 sm:col-span-4"
                  :error="errors?.email"
                />
                <Input
                  v-model="form.password"
                  label="Password"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.password"
                />
                <Select
                  v-model="form.owner"
                  :items="ownerOptions"
                  label="Owner"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.owner"
                />
                <FileInput
                  v-model="form.photo"
                  accept="image/*"
                  label="Photo"
                  class="col-span-6 sm:col-span-4"
                  :error="errors?.photo"
                />
              </div>
            </div>
            <div class="px-8 py-3 bg-gray-50 text-right">
              <Button type="submit" variant="primary" :disabled="form.processing">Create</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>