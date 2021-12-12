<script setup lang="ts">
const props = withDefaults(defineProps<{
  total?: number
  perPage?: number
  currentPage?: number
  prev?: number | null
  next?: number | null
}>(), {
  total: 0,
  perPage: 10,
  currentPage: 1
})
const emit = defineEmits<(e: 'update:changed', value: number) => void>()

const startItem = computed(() => (props?.currentPage - 1) * props?.perPage + 1)
const endItem = computed(() => (props?.currentPage - 1) * props?.perPage + props?.perPage)
const setPage = (page?: number | null) => emit('update:changed', page || 1)
</script>

<template>
  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        {{ ' ' }}
        <span class="font-medium">{{ startItem }}</span>
        {{ ' ' }}
        to
        {{ ' ' }}
        <span
          class="font-medium"
        >{{ endItem < total ? endItem : total }}</span>
        {{ ' ' }}
        of
        {{ ' ' }}
        <span class="font-medium">{{ total }}</span>
        {{ ' ' }}
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end space-x-2">
      <Button :disabled="!prev" @click="setPage(prev)">Previous</Button>
      <Button :disabled="!next" @click="setPage(next)">Next</Button>
    </div>
  </nav>
</template>
