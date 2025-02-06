<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Service, ServiceRequest } from '@/types/service'

const props = defineProps<{
  selectedService?: Service | null
}>()

const emit = defineEmits(['close', 'submit'])

const categories = [
  'Home Care',
  'Healthcare',
  'Pet Care',
  'Housekeeping',
  'Personal Care'
]

const request = ref<ServiceRequest>({
  category: '',
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  budget: 0
})

watch(() => props.selectedService, (service) => {
  if (service) {
    request.value = {
      ...request.value,
      category: service.category,
      title: `Book ${service.title}`,
      budget: service.price
    }
  }
}, { immediate: true })

function handleSubmit() {
  emit('submit', request.value)
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">
          {{ selectedService ? `Book ${selectedService.title}` : 'Request a Service' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select
            v-model="request.category"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            v-model="request.title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., Need a pet sitter for weekend"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="request.description"
            required
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Describe your needs in detail"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              v-model="request.date"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              v-model="request.time"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            v-model="request.location"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your address"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Budget ($/hr)</label>
          <input
            type="number"
            v-model="request.budget"
            required
            min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>