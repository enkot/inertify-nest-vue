<script setup lang="ts">
defineProps<{
  headers: {
    name: string
    label: string
  }[],
  rows: Record<string, any>
}>()
</script>

<template>
  <table v-if="rows.length" class="w-full divide-y divide-gray-200">
    <thead class="bg-white">
      <tr>
        <th
          v-for="{ name, label } in headers"
          :key="name"
          scope="col"
          class="px-6 py-3 text-left text-sm text-gray-400"
        >{{ label }}</th>
        <th scope="col" class="relative px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(row, i) in rows" :key="i" class="group hover:bg-gray-50">
        <td v-for="{ name } in headers">
          <Link :href="row.link" class="block px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <slot :name="name" :row="row">
              <div>
                <div class="text-sm text-gray-900">{{ row[name] }}</div>
              </div>
            </slot>
          </Link>
        </td>
        <td>
          <Link :href="row.link" class="flex items-center justify-end px-6 py-4 whitespace-nowrap">
            <heroicons-outline-chevron-right class="text-gray-500 h-4 w-4" />
          </Link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="text-sm text-gray-500 px-6 py-8 bg-white">No results found</div>
</template>