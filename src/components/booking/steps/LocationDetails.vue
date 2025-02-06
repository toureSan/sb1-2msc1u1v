<script setup lang="ts">
const props = defineProps<{
  location: string
}>()

const emit = defineEmits(['update:location'])
</script>

<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700">Service Location</label>
      <textarea
        :value="location"
        @input="$emit('update:location', $event.target.value)"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Enter the full address where the service will be provided..."
      />
    </div>
  </div>
</template>