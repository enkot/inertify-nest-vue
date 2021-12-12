<script setup lang="ts">
import { Contact } from '@prisma/client'
import { PaginatedResult } from 'prisma-pagination'

const props = defineProps<{
  filters: {
    search: string
  }
  users: PaginatedResult<Contact>
}>()

const form = ref({
  search: props.filters?.search || ''
})

const headers = [
  { name: 'name', label: 'Name' },
  { name: 'role', label: 'Role' }
]

throttledWatch(
  form,
  () => {
    Inertia.get('users', form.value, { preserveState: true })
  },
  { throttle: 150, deep: true }
)
</script>

<template>
  <div>
    <Head title="Contacts" />
    <header>
      <div
        class="max-w-screen-2xl md:flex md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 class="text-3xl font-bold leading-tight text-gray-800">Users</h1>
      </div>
      <div
        class="max-w-screen-2xl sm:flex sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2 mx-auto px-4 sm:px-6 lg:px-8 mt-6"
      >
        <Input v-model="form.search" placeholder="Search..." class="w-full sm:max-w-xs" />
        <Button href="/users/create" variant="primary" class="w-full sm:w-auto flex-shrink-0">
          <heroicons-solid-plus class="h-4 w-4 mr-2" />
          <span>Add User</span>
        </Button>
      </div>
    </header>
    <main>
      <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
        <div class="w-full mt-6 shadow border-gray-200 sm:rounded-lg md:overflow-hidden">
          <div class="md:flex-1 overflow-x-auto">
            <Table
              :headers="headers"
              :rows="users.data.map(item => ({ ...item, link: `/users/${item.id}` }))"
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
              <template #role="{ row }">
                <span class="text-sm text-gray-500">{{ row.owner ? 'Owner' : 'User' }}</span>
              </template>
            </Table>
          </div>
          <Pagination
            v-bind="users.meta"
            @update:changed="$inertia.reload({ data: { page: $event } })"
          />
        </div>
      </div>
    </main>
  </div>
</template>