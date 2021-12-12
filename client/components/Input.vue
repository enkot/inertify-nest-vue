<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string | null
  type?: 'text' | 'password' | 'file'
  label?: string
  placeholder?: string
  error?: string
}>(), {
  type: 'text',
  placeholder: ''
})
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>()
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    <div>
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        class="appearance-none block w-full px-3 py-2.5 border text-sm border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
        :class="{ 'border-red-600': error }"
        @input="handleInput"
      />
      <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
    </div>
  </div>
</template>