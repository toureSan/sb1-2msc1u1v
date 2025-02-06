<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'
import type { ProviderRegistration } from '@/types/provider'
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  formData: ProviderRegistration
  isSubmitting: boolean
}>()

const emit = defineEmits(['submit'])
const router = useRouter()
const { addNotification } = useNotification()
const showSuccess = ref(false)

const handleSubmit = async () => {
  try {
    console.log('Submitting registration:', props.formData)
    await emit('submit')
    showSuccess.value = true
    addNotification('success', 'Votre inscription a été enregistrée avec succès')
  } catch (error) {
    console.error('Submit error:', error)
    addNotification('error', 'Une erreur est survenue lors de l\'inscription')
  }
}
</script>

<template>
  <div v-if="!showSuccess" class="space-y-6">
    <h2 class="text-lg font-medium text-gray-900">Récapitulatif de votre inscription</h2>
    
    <!-- Personal Info -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-medium mb-2">Informations Personnelles</h3>
      <p>{{ formData.personal.firstName }} {{ formData.personal.lastName }}</p>
      <p>{{ formData.personal.email }}</p>
      <p>{{ formData.personal.phone }}</p>
      <p>{{ formData.personal.address }}</p>
    </div>

    <!-- Service Info -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-medium mb-2">Services Proposés</h3>
      <p>Catégories: {{ formData.service.categories.join(', ') }}</p>
      <p>Description: {{ formData.service.description }}</p>
      <p>Tarif horaire: {{ formData.service.rate ? formatPrice(formData.service.rate) : '-' }}</p>
      <p>Rayon d'action: {{ formData.service.radius }}km</p>
    </div>

    <!-- Qualifications -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-medium mb-2">Qualifications</h3>
      <p>Expérience: {{ formData.qualifications.experience }}</p>
      <p>Certifications: {{ formData.qualifications.certifications.join(', ') || '-' }}</p>
      <p>Références: {{ formData.qualifications.references.join(', ') || '-' }}</p>
    </div>

    <!-- Availability -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-medium mb-2">Disponibilités</h3>
      <p>Date de début: {{ formData.availability.startDate }}</p>
      <p>Jours disponibles: {{ Object.entries(formData.availability.schedule)
        .filter(([_, value]) => value)
        .map(([day]) => day)
        .join(', ') }}</p>
    </div>

    <div class="mt-6">
      <button
        @click="handleSubmit"
        :disabled="isSubmitting"
        class="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {{ isSubmitting ? 'Inscription en cours...' : 'Confirmer mon inscription' }}
      </button>
    </div>
  </div>

  <div v-else class="text-center space-y-6">
    <!-- Success Icon -->
    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
      <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Success Message -->
    <div class="space-y-4">
      <h3 class="text-xl font-medium text-gray-900">Inscription réussie !</h3>
      <p class="text-gray-600">
        Merci de votre inscription en tant que prestataire de services. Notre équipe va examiner votre dossier dans les plus brefs délais.
      </p>
      <p class="text-gray-600">
        Vous recevrez un email de confirmation dès que votre compte sera activé. Cela ne devrait pas prendre plus de 24-48 heures ouvrées.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 space-x-4">
      <button
        @click="router.push('/')"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>