<script setup lang="ts">
interface Flash {
  message: string
  type?: string
}

const show = ref(true)
const flash = computed(() => usePage<{ flash: Flash }>().props.value.flash)

let timer: any = null

watch(
  flash,
  () => {
    show.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => show.value = false, 4000)
  },
  { immediate: true }
)
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:px-6 sm:py-20 sm:items-start z-50"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show && flash"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-center">
              <heroicons-outline-x-circle
                v-if="flash.type === 'error'"
                class="h-6 w-6 text-red-400 flex-shrink-0"
                aria-hidden="true"
              />
              <heroicons-outline-check-circle
                v-else
                class="h-6 w-6 text-green-400 flex-shrink-0"
                aria-hidden="true"
              />
              <div class="ml-2.5 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ flash.message }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="show = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  <span class="sr-only">Close</span>
                  <heroicons-solid-x class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
