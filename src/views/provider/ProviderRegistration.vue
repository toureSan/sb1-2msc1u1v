<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProviderRegistration } from '@/composables/useProviderRegistration'
import { ProviderSteps, PersonalInfo, ServiceDetails, Qualifications, Availability, RegistrationComplete } from '@/components/provider'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const router = useRouter()
const { 
  currentStep,
  totalSteps,
  formData,
  isSubmitting,
  handleSubmit,
  goToNextStep,
  goToPreviousStep
} = useProviderRegistration()

const validateCurrentStep = () => {
  if (!formData.value) return false

  switch (currentStep.value) {
    case 1: // Personal Info
      return !!(formData.value.personal?.firstName && 
                formData.value.personal?.lastName && 
                formData.value.personal?.email && 
                formData.value.personal?.phone && 
                formData.value.personal?.address)
    case 2: // Service Details
      return !!(formData.value.service?.categories?.length && 
                formData.value.service?.description && 
                formData.value.service?.rate && 
                formData.value.service?.radius)
    case 3: // Qualifications
      return !!(formData.value.qualifications?.experience)
    case 4: // Availability
      return !!(Object.keys(formData.value.availability?.schedule || {}).length && 
                formData.value.availability?.startDate)
    default:
      return true
  }
}

const handleNext = () => {
  if (validateCurrentStep()) {
    goToNextStep()
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Bouton retour -->
        <div class="mb-8">
          <router-link 
            to="/" 
            class="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon class="h-5 w-5 mr-1" />
            Retour à l'accueil
          </router-link>
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-6">Devenir Prestataire</h1>
          
          <ProviderSteps
            :current-step="currentStep"
            :total-steps="totalSteps"
            class="mb-8"
          />

          <div v-if="currentStep === 1">
            <PersonalInfo v-model="formData.personal" />
          </div>

          <div v-else-if="currentStep === 2">
            <ServiceDetails v-model="formData.service" />
          </div>

          <div v-else-if="currentStep === 3">
            <Qualifications v-model="formData.qualifications" />
          </div>

          <div v-else-if="currentStep === 4">
            <Availability v-model="formData.availability" />
          </div>

          <div v-else-if="currentStep === 5">
            <RegistrationComplete
              :form-data="formData"
              :is-submitting="isSubmitting"
              @submit="handleSubmit"
            />
          </div>

          <div class="mt-8 flex justify-between">
            <button
              v-if="currentStep > 1"
              @click="goToPreviousStep"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Précédent
            </button>
            <button
              v-if="currentStep < totalSteps"
              @click="handleNext"
              class="ml-auto px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>