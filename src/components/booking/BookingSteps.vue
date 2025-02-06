<script setup lang="ts">
const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const steps = [
  { 
    number: 1,
    title: 'Service',
    description: 'Personnaliser votre demande'
  },
  { 
    number: 2,
    title: 'Date & Heure',
    description: 'Sélectionner vos disponibilités'
  },
  { 
    number: 3,
    title: 'Lieu',
    description: 'Préciser la localisation'
  },
  { 
    number: 4,
    title: 'Confirmation',
    description: 'Valider votre réservation'
  }
]
</script>

<template>
  <div class="py-8">
    <nav aria-label="Progress">
      <ol class="flex items-center justify-between w-full">
        <li 
          v-for="(step, index) in steps" 
          :key="step.number"
          class="relative flex flex-col items-center"
        >
          <!-- Ligne de connexion -->
          <div 
            v-if="index > 0"
            class="absolute left-[-50%] top-5 w-full h-0.5"
            :class="[
              index <= currentStep - 1 ? 'bg-black' : 'bg-gray-200'
            ]"
          />

          <!-- Cercle et numéro -->
          <div 
            class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
            :class="[
              index + 1 === currentStep ? 'border-black bg-white' :
              index + 1 < currentStep ? 'border-black bg-black' :
              'border-gray-300 bg-white'
            ]"
          >
            <span 
              class="text-sm font-semibold"
              :class="[
                index + 1 === currentStep ? 'text-black' :
                index + 1 < currentStep ? 'text-white' :
                'text-gray-500'
              ]"
            >
              {{ step.number }}
            </span>
          </div>

          <!-- Texte -->
          <div class="mt-4 text-center">
            <span 
              class="block text-sm font-medium"
              :class="[
                index + 1 === currentStep ? 'text-black' :
                index + 1 < currentStep ? 'text-black' :
                'text-gray-500'
              ]"
            >
              {{ step.title }}
            </span>
            <span class="mt-1 block text-xs text-gray-500">
              {{ step.description }}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>