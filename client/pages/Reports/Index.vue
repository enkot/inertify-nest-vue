<script setup lang="ts">
defineProps<{
  posts?: string[]
  users?: string[]
}>()
</script>

<template>
  <header>
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Reports</h1>
    </div>
  </header>
  <main>
    <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-8 sm:col-span-2 lg:col-span-3 px-4 py-4 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
      </div>
    </div>
  </main>
</template>
