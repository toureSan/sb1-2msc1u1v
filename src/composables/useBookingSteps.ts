import { ref } from 'vue'

export function useBookingSteps(totalSteps: number) {
  const currentStep = ref(1)

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

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep
  }
}