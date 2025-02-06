<script setup lang="ts">
import { ref } from 'vue'
import { CATEGORIES } from '@/utils/constants'

const props = defineProps<{
  modelValue: {
    categories: string[]
    description: string
    rate: number | null
    radius: number | null
  }
}>()

const emit = defineEmits(['update:modelValue'])
const errors = ref<Record<string, string>>({})

const validateField = (field: string, value: any) => {
  errors.value[field] = ''

  switch (field) {
    case 'categories':
      if (!value || value.length === 0) {
        errors.value.categories = 'Sélectionnez au moins une catégorie'
      }
      break

    case 'description':
      if (!value.trim()) {
        errors.value.description = 'La description est requise'
      } else if (value.length < 50) {
        errors.value.description = 'La description doit contenir au moins 50 caractères'
      } else if (value.length > 500) {
        errors.value.description = 'La description ne doit pas dépasser 500 caractères'
      }
      break

    case 'rate':
      if (!value) {
        errors.value.rate = 'Le tarif horaire est requis'
      } else if (value < 15) {
        errors.value.rate = 'Le tarif minimum est de 15€/h'
      } else if (value > 150) {
        errors.value.rate = 'Le tarif maximum est de 150€/h'
      }
      break

    case 'radius':
      if (!value) {
        errors.value.radius = 'Le rayon d\'intervention est requis'
      } else if (value < 1) {
        errors.value.radius = 'Le rayon minimum est de 1 km'
      } else if (value > 100) {
        errors.value.radius = 'Le rayon maximum est de 100 km'
      }
      break
  }

  return !errors.value[field]
}

const updateField = (field: string, value: any) => {
  validateField(field, value)
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

const toggleCategory = (category: string) => {
  const newCategories = props.modelValue.categories.includes(category)
    ? props.modelValue.categories.filter(c => c !== category)
    : [...props.modelValue.categories, category]
  
  updateField('categories', newCategories)
}

const remainingChars = ref(500)
const updateDescription = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  remainingChars.value = 500 - value.length
  updateField('description', value)
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-medium text-gray-900">Détails des Services</h2>

    <!-- Catégories de services -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Catégories de services
      </label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="category in CATEGORIES"
          :key="category.id"
          type="button"
          @click="toggleCategory(category.id)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            props.modelValue.categories.includes(category.id)
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
      <p v-if="errors.categories" class="mt-1 text-sm text-red-600">
        {{ errors.categories }}
      </p>
    </div>

    <!-- Description du service -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Description de vos services</label>
      <div class="mt-1 relative">
        <textarea
          :value="modelValue.description"
          @input="updateDescription"
          @blur="validateField('description', modelValue.description)"
          rows="5"
          class="block w-full rounded-md shadow-sm"
          :class="[
            errors.description
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          ]"
          placeholder="Décrivez en détail les services que vous proposez, votre expérience et vos compétences..."
        />
        <div class="absolute bottom-2 right-2 text-sm text-gray-500">
          {{ remainingChars }}/500
        </div>
      </div>
      <p v-if="errors.description" class="mt-1 text-sm text-red-600">
        {{ errors.description }}
      </p>
    </div>

    <!-- Tarif horaire -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Tarif horaire (€/h)</label>
      <input
        type="number"
        :value="modelValue.rate"
        @input="updateField('rate', Number(($event.target as HTMLInputElement).value))"
        @blur="validateField('rate', modelValue.rate)"
        min="15"
        max="150"
        step="0.5"
        class="mt-1 block w-full rounded-md shadow-sm"
        :class="[
          errors.rate
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        ]"
      />
      <p v-if="errors.rate" class="mt-1 text-sm text-red-600">
        {{ errors.rate }}
      </p>
    </div>

    <!-- Rayon d'intervention -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Rayon d'intervention (km)</label>
      <input
        type="number"
        :value="modelValue.radius"
        @input="updateField('radius', Number(($event.target as HTMLInputElement).value))"
        @blur="validateField('radius', modelValue.radius)"
        min="1"
        max="100"
        class="mt-1 block w-full rounded-md shadow-sm"
        :class="[
          errors.radius
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        ]"
      />
      <p v-if="errors.radius" class="mt-1 text-sm text-red-600">
        {{ errors.radius }}
      </p>
    </div>
  </div>
</template>