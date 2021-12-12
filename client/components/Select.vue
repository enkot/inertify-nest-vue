<script setup lang="ts">
interface Item {
  id: number | string | boolean
  name: string
}

const props = defineProps<{
  modelValue?: number | string | boolean
  items: Item[]
  label?: string
  error?: string
}>()
const emit = defineEmits<(e: 'update:modelValue', value?: number | string | boolean) => void>()
const selected = ref<Item | undefined>(props.items?.find(item => item.id === props.modelValue))

watch(
  selected,
  () => {
    emit('update:modelValue', selected.value?.id)
  }
)
</script>

<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel class="block text-sm font-medium text-gray-700">{{ label }}</ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
        :class="{ 'border-red-600': error }"
      >
        <span class="block truncate">{{ selected?.name || '-' }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <heroicons-solid-selector class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>
      <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in items"
            :key="item.id"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li
              :class="[active ? 'text-white bg-violet-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']"
            >
              <span
                :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
              >{{ item.name }}</span>

              <span
                v-if="selected"
                :class="[active ? 'text-white' : 'text-violet-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']"
              >
                <heroicons-solid-check class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

