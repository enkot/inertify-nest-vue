<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  variant?: 'primary' | 'default'
}>(), {
  variant: 'default'
})
</script>

<template>
  <Link v-if="$props.href" :href="href" as="button" class="btn" :class="`btn-${props.variant}`">
    <slot />
  </Link>
  <button v-else class="btn" :class="`btn-${props.variant}`">
    <slot />
  </button>
</template>

<style lang="postcss">
.btn {
  @apply inline-flex justify-center items-center px-4 py-2.5 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500  disabled:opacity-50;
}
.btn-default {
  @apply border-gray-300 bg-white hover:bg-gray-50 text-gray-800;
}
.btn-primary {
  @apply border-violet-600 bg-violet-600 hover:bg-violet-700 hover:border-violet-700 text-white;
}
</style>