<script setup lang="ts">
defineProps<{
  errors?: Record<string, string>
}>()

const form = useForm({
  name: undefined,
  email: undefined,
  phone: undefined,
  address: undefined,
  city: undefined,
  region: undefined,
  country: undefined,
  postalCode: undefined,
})
</script>

<template>
  <div>
    <Head title="Create Organization" />
    <header>
      <div
        class="max-w-4xl md:flex md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 class="flex items-center text-3xl font-bold leading-tight text-gray-800 space-x-1.5">
          <Link href="/organizations" class="hover:text-violet-700">Organizations</Link>
          <span class="text-gray-300">/</span>
          <span>Create</span>
        </h1>
      </div>
    </header>
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-6 flex flex-col">
        <form @submit.prevent="form.post('/organizations')">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="bg-white py-10 px-8 space-y-6">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Primary Information</h3>
                <p
                  class="mt-1 text-sm text-gray-500"
                >Provide basic information about the organization.</p>
              </div>

              <div class="grid grid-cols-6 gap-6">
                <Input
                  v-model="form.name"
                  label="Name"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.name"
                />
                <Input
                  v-model="form.phone"
                  label="Phone"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.phone"
                />
                <Input
                  v-model="form.email"
                  label="Email"
                  class="col-span-6 sm:col-span-4"
                  :error="errors?.email"
                />
                <Input
                  v-model="form.country"
                  label="Country"
                  class="col-span-6 sm:col-span-3"
                  :error="errors?.country"
                />
                <Input v-model="form.address" label="Address" class="col-span-6" />
                <Input
                  v-model="form.city"
                  label="City"
                  class="col-span-6 sm:col-span-6 lg:col-span-2"
                  :error="errors?.city"
                />
                <Input
                  v-model="form.region"
                  label="Province/State"
                  class="col-span-6 sm:col-span-3 lg:col-span-2"
                  :error="errors?.region"
                />
                <Input
                  v-model="form.postalCode"
                  label="Postal code"
                  class="col-span-6 sm:col-span-3 lg:col-span-2"
                  :error="errors?.postalCode"
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