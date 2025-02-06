<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: {
    schedule: Record<string, boolean>
    startDate: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const days = [
  { id: 'monday', label: 'Lundi' },
  { id: 'tuesday', label: 'Mardi' },
  { id: 'wednesday', label: 'Mercredi' },
  { id: 'thursday', label: 'Jeudi' },
  { id: 'friday', label: 'Vendredi' },
  { id: 'saturday', label: 'Samedi' },
  { id: 'sunday', label: 'Dimanche' }
]

// Calcul de la date minimum (aujourd'hui)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Calcul de la date maximum (3 mois à partir d'aujourd'hui)
const maxDate = computed(() => {
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  return maxDate.toISOString().split('T')[0]
})

// Validation des erreurs
const errors = ref({
  schedule: '',
  startDate: ''
})

const validateSchedule = (schedule: Record<string, boolean>) => {
  const hasSelectedDays = Object.values(schedule).some(value => value)
  errors.value.schedule = hasSelectedDays ? '' : 'Sélectionnez au moins un jour de disponibilité'
  return hasSelectedDays
}

const validateStartDate = (date: string) => {
  if (!date) {
    errors.value.startDate = 'La date de début est requise'
    return false
  }

  const selectedDate = new Date(date)
  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)

  if (selectedDate < today) {
    errors.value.startDate = 'La date ne peut pas être dans le passé'
    return false
  }

  if (selectedDate > maxDate) {
    errors.value.startDate = 'La date ne peut pas être à plus de 3 mois'
    return false
  }

  errors.value.startDate = ''
  return true
}

const updateSchedule = (day: string, value: boolean) => {
  const newSchedule = {
    ...props.modelValue.schedule,
    [day]: value
  }
  validateSchedule(newSchedule)
  emit('update:modelValue', {
    ...props.modelValue,
    schedule: newSchedule
  })
}

const updateStartDate = (date: string) => {
  validateStartDate(date)
  emit('update:modelValue', {
    ...props.modelValue,
    startDate: date
  })
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-medium text-gray-900">Disponibilités</h2>

    <div>
      <label class="block text-sm font-medium text-gray-700">Jours de Disponibilité</label>
      <div class="mt-2 space-y-2">
        <div
          v-for="day in days"
          :key="day.id"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :id="day.id"
            :checked="modelValue.schedule[day.id]"
            @change="updateSchedule(day.id, ($event.target as HTMLInputElement).checked)"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          >
          <label :for="day.id" class="ml-2 text-sm text-gray-700">
            {{ day.label }}
          </label>
        </div>
      </div>
      <p v-if="errors.schedule" class="mt-1 text-sm text-red-600">{{ errors.schedule }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Date de Début</label>
      <input
        type="date"
        :value="modelValue.startDate"
        @input="updateStartDate(($event.target as HTMLInputElement).value)"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :min="minDate"
        :max="maxDate"
      >
      <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">{{ errors.startDate }}</p>
      <p class="mt-1 text-sm text-gray-500">
        La date de début doit être comprise entre aujourd'hui et dans 3 mois maximum
      </p>
    </div>
  </div>
</template>