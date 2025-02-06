<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Service } from '@/types/service'
import { formatDate } from '@/utils/date'
import FormField from './FormField.vue'
import StepHeader from './StepHeader.vue'

const props = defineProps<{
  service: Service
  dateTime: string
}>()

const emit = defineEmits(['update:dateTime'])

const selectedDate = ref('')
const selectedTime = ref('')

// Simuler les disponibilités du prestataire (à remplacer par les vraies données)
const providerAvailability = {
  '1': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '2': ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
  '3': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '4': ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
  '5': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
}

// Générer les 14 prochains jours disponibles
const availableDates = computed(() => {
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Exclure les weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push({
        value: date.toISOString().split('T')[0],
        label: formatDate(date.toISOString())
      })
    }
  }
  
  return dates
})

// Obtenir les créneaux disponibles pour la date sélectionnée
const availableTimeSlots = computed(() => {
  if (!selectedDate.value) return []
  
  const date = new Date(selectedDate.value)
  const dayOfWeek = date.getDay().toString()
  
  return providerAvailability[dayOfWeek as keyof typeof providerAvailability] || []
})

const updateDateTime = () => {
  if (selectedDate.value && selectedTime.value) {
    emit('update:dateTime', `${selectedDate.value}T${selectedTime.value}:00`)
  }
}
</script>

<template>
  <div class="space-y-6">
    <StepHeader title="Sélection de la date et l'heure" />
    
    <div class="bg-gray-50 p-4 rounded-lg">
      <div class="flex items-start space-x-4">
        <img
          :src="service.provider.avatar"
          :alt="service.provider.name"
          class="h-12 w-12 rounded-full"
        >
        <div>
          <h3 class="text-lg font-medium text-gray-900">{{ service.title }}</h3>
          <p class="text-sm text-gray-500">avec {{ service.provider.name }}</p>
          <div class="mt-1 text-sm text-gray-600">
            Disponible du lundi au vendredi
          </div>
        </div>
      </div>
    </div>

    <FormField label="Sélectionnez une date">
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="date in availableDates"
          :key="date.value"
          @click="selectedDate = date.value"
          class="p-2 text-sm rounded-lg border"
          :class="[
            selectedDate === date.value
              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
              : 'border-gray-300 hover:border-indigo-300'
          ]"
        >
          {{ date.label }}
        </button>
      </div>
    </FormField>

    <FormField label="Sélectionnez une heure" v-if="selectedDate">
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="time in availableTimeSlots"
          :key="time"
          @click="selectedTime = time; updateDateTime()"
          class="p-2 text-sm rounded-lg border"
          :class="[
            selectedTime === time
              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
              : 'border-gray-300 hover:border-indigo-300'
          ]"
        >
          {{ time }}
        </button>
      </div>
    </FormField>

    <div v-if="!selectedDate" class="text-sm text-gray-500 italic">
      Veuillez d'abord sélectionner une date pour voir les créneaux disponibles
    </div>
  </div>
</template>