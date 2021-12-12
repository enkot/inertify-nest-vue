<script setup lang="ts">
import { Organization, Contact } from '@prisma/client'

const props = defineProps<{
  errors?: Record<string, string>
  organization: Organization & { contacts: Contact[] }
}>()

const form = useForm({
  name: props.organization.name,
  email: props.organization.email,
  phone: props.organization.phone,
  address: props.organization.address,
  city: props.organization.city,
  region: props.organization.region,
  country: props.organization.country,
  postalCode: props.organization.postalCode,
})

const headers = [
  { name: 'name', label: 'Name' },
  { name: 'address', label: 'Address' },
  { name: 'phone', label: 'Phone' }
]

const destroy = () => {
  if (confirm('Are you sure you want to delete this organization?'))
    Inertia.delete(`/organizations/${props.organization.id}`)
}
</script>

<template>
  <div>
    <Head :title="organization.name" />
    <header>
      <div
        class="max-w-4xl md:flex md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 class="flex items-center text-3xl font-bold leading-tight text-gray-800 space-x-1.5">
          <Link href="/organizations" class="hover:text-violet-700">Organizations</Link>
          <span class="text-gray-300">/</span>
          <span>{{ form.name }}</span>
        </h1>
      </div>
    </header>
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-6 flex flex-col">
        <form @submit.prevent="form.put(`/organizations/${organization.id}`)">
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
            <div class="flex items-center justify-between px-8 py-3 bg-gray-50 text-right">
              <span
                class="text-red-700 hover:underline cursor-pointer"
                @click="destroy"
              >Delete Organization</span>
              <Button type="submit" variant="primary" :disabled="form.processing">Update</Button>
            </div>
          </div>
        </form>
      </div>
      <h2 class="text-2xl font-bold leading-tight text-gray-800 mt-10">Contacts</h2>
      <div class="shadow sm:rounded-md sm:overflow-hidden mt-6">
        <Table
          :headers="headers"
          :rows="props.organization.contacts.map(item => ({ ...item, link: `/contacts/${item.id}/edit` }))"
        >
          <template #name="{ row }">
            <div class="flex items-center">
              <div
                class="flex flex-shrink-0 justify-center items-center h-10 w-10 rounded-lg text-violet-500 bg-violet-50 font-semibold group-hover:bg-violet-500 group-hover:text-white uppercase"
              >{{ row.firstName.slice(0, 1) }}</div>
              <div class="ml-4">
                <div
                  class="text-sm font-medium text-gray-900"
                >{{ row.firstName }} {{ row.lastName }}</div>
                <div class="text-sm text-gray-500">{{ row.email }}</div>
              </div>
            </div>
          </template>
          <template #address="{ row }">
            <div class="text-sm text-gray-900">{{ row.address }}</div>
            <div class="text-sm text-gray-500">{{ row.country }}</div>
          </template>
          <template #phone="{ row }">
            <span class="text-sm text-gray-500">{{ row.phone }}</span>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>