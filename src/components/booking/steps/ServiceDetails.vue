<script setup lang="ts">
import type { Service } from '@/types/service'
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  service: Service
  duration: number
  specialRequests: string
}>()

const emit = defineEmits(['update:duration', 'update:specialRequests', 'next'])

const handleNext = () => {
  emit('next')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Service Summary -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-start space-x-4">
        <img
          :src="service.provider.avatar"
          :alt="service.provider.name"
          class="h-16 w-16 rounded-full object-cover"
        >
        <div>
          <h3 class="text-xl font-bold text-gray-900">{{ service.title }}</h3>
          <p class="text-base text-gray-600">{{ service.provider.name }}</p>
          <p class="text-lg font-semibold text-black">{{ formatPrice(service.price) }}</p>
        </div>
      </div>
    </div>

    <!-- Duration Selection -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Durée (heures)</label>
      <select
        :value="duration"
        @change="$emit('update:duration', Number($event.target.value))"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
      >
        <option value="1">1 heure</option>
        <option value="2">2 heures</option>
        <option value="3">3 heures</option>
        <option value="4">4 heures</option>
      </select>
    </div>

    <!-- Special Requests -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Demandes spéciales</label>
      <textarea
        :value="specialRequests"
        @input="$emit('update:specialRequests', ($event.target as HTMLTextAreaElement).value)"
        rows="4"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        placeholder="Précisez vos besoins particuliers..."
      />
    </div>

    <!-- Bouton Suivant -->
    <div class="flex justify-end">
      <button
        @click="handleNext"
        class="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Suivant
      </button>
    </div>
  </div>
</template>