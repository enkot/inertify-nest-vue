<script setup lang="ts">
const props = defineProps<{
  modelValue?: File | string,
  label: string,
  accept: string,
  error?: string
}>()
const emit = defineEmits<(e: 'update:modelValue', value: File | null) => void>()

const file = ref()
const url = computed(() => typeof (props.modelValue) === 'string' ? props.modelValue : URL.createObjectURL(props.modelValue))

watch(
  () => props.modelValue,
  (value) => {
    if (!value) file.value.value = ''
  },
)
const browse = () => {
  file.value.click()
}
const change = (e: any) => {
  const file = e.target.files[0]
  emit('update:modelValue', file)
}
const remove = () => {
  emit('update:modelValue', null)
}
</script>

<template>
  <div>
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="form-input p-0">
      <input ref="file" type="file" :accept="accept" class="hidden" @change="change" />
      <div v-if="!modelValue">
        <Button type="button" @click="browse">Browse</Button>
      </div>
      <div v-else class="flex items-center space-x-2">
        <div class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          <img :src="url" alt="Avatar" class="object-cover aspect-square" />
        </div>
        <Button type="button" @click="remove">Remove</Button>
      </div>
    </div>
    <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
  </div>
</template>