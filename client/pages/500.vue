<script lang="ts">
import Layout from '@/layouts/Empty.vue'

export default {
  layout: Layout
}
</script>

<template>
  <div
    class="h-full bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
  >
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-violet-600 sm:text-5xl">500</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1
              class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
            >Oops, something went wrong...</h1>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Button href="/" variant="primary">Go to the Dashboard</Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>