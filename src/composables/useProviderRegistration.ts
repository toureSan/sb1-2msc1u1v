import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from './useNotification'
import { providerRegistrationService } from '@/services/provider/registration.service'
import type { ProviderRegistration } from '@/types/provider'

export function useProviderRegistration() {
  const router = useRouter()
  const { addNotification } = useNotification()
  const currentStep = ref(1)
  const totalSteps = 5
  const isSubmitting = ref(false)

  const formData = ref<ProviderRegistration>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      profilePicture: null
    },
    service: {
      categories: [],
      description: '',
      rate: null,
      radius: null
    },
    qualifications: {
      experience: '',
      certifications: [],
      references: []
    },
    availability: {
      schedule: {},
      startDate: ''
    }
  })

  const goToNextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  const goToPreviousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting.value) return
    
    try {
      isSubmitting.value = true
      console.log('Submitting provider data:', formData.value)
      
      const result = await providerRegistrationService.registerProvider(formData.value)
      console.log('Registration successful:', result)
      
      addNotification('success', 'Votre inscription a été effectuée avec succès')
      
      // Redirection après un délai pour laisser le temps de voir le message de succès
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      
      return result
    } catch (error) {
      console.error('Registration error:', error)
      addNotification('error', error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription')
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    handleSubmit,
    goToNextStep,
    goToPreviousStep
  }
}