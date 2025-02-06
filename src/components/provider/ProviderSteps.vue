<script setup lang="ts">
const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const steps = [
  { 
    number: 1,
    title: 'Informations Personnelles', 
    description: 'Vos coordonnées' 
  },
  { 
    number: 2,
    title: 'Services', 
    description: 'Détails de vos services' 
  },
  { 
    number: 3,
    title: 'Qualifications', 
    description: 'Expérience et certifications' 
  },
  { 
    number: 4,
    title: 'Disponibilités', 
    description: 'Horaires de travail' 
  },
  { 
    number: 5,
    title: 'Finalisation', 
    description: 'Vérification et soumission' 
  }
]
</script>

<template>
  <nav aria-label="Progress">
    <ol class="space-y-4 md:flex md:space-y-0 md:space-x-8">
      <li v-for="step in steps" :key="step.number" class="md:flex-1">
        <div class="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
          :class="[
            step.number < currentStep ? 'border-indigo-600' :
            step.number === currentStep ? 'border-indigo-600' : 'border-gray-200'
          ]"
        >
          <span class="text-sm font-medium"
            :class="[
              step.number < currentStep ? 'text-indigo-600' :
              step.number === currentStep ? 'text-indigo-600' : 'text-gray-500'
            ]"
          >
            Étape {{ step.number }}
          </span>
          <span class="text-sm font-medium">{{ step.title }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>