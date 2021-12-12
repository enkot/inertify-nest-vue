<script setup lang="ts">
import CityIcon from '~icons/heroicons-outline/office-building'
import PeoplesIcon from '~icons/heroicons-outline/users'
import ReportsIcon from '~icons/heroicons-outline/document-text'

const props = defineProps<{
  stats: any[]
}>()

const stats = [
  { id: 'organizations', name: 'Total Organizations', icon: CityIcon },
  { id: 'contacts', name: 'Total Contacts', icon: PeoplesIcon },
  { id: 'reports', name: 'Total Reports', icon: ReportsIcon },
].map(item => ({
  ...item,
  ...props.stats.find(({ id }) => id === item.id)
}))
</script>

<template>
  <header>
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Overview</h1>
    </div>
  </header>
  <main>
    <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
      <dl class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in stats"
          :key="item.id"
          class="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow sm:rounded-lg overflow-hidden"
        >
          <dt>
            <div class="absolute bg-violet-500 rounded-lg p-3">
              <component :is="item.icon" class="block h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 text-sm font-medium text-gray-500 truncate">{{ item.name }}</p>
          </dt>
          <dd class="ml-16 pb-6 flex items-baseline">
            <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
            <p
              :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']"
            >
              <heroicons-solid-arrow-sm-up
                v-if="item.changeType === 'increase'"
                class="self-center flex-shrink-0 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
              <heroicons-solid-arrow-sm-down
                v-else
                class="self-center flex-shrink-0 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              <span
                class="sr-only"
              >{{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by</span>
              {{ item.change }}
            </p>
          </dd>
        </div>
      </dl>
      <div class="sm:col-span-2 lg:col-span-3 px-4 py-4 sm:px-0">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Hey there!</h3>
            <p class="mt-1 text-gray-500">
              Welcome to
              <b>Inertify</b> CRM, a demo app designed to help illustrate how
              <a
                href="https://inertiajs.com/"
              >Inertia.js</a> works with
              <a href="https://nestjs.com/">Nest.js</a> and
              <a href="https://v3.vuejs.org/">Vue 3</a>.
            </p>
            <div class="mt-4 space-x-2">
              <Button href="/404">Not found page</Button>
              <Button href="/500">Server error page</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>