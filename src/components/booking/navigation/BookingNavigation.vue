<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
}>()

defineEmits(['previous', 'next', 'submit'])
</script>

<template>
  <div class="mt-8 flex justify-between border-t pt-6">
    <!-- Bouton Précédent -->
    <button
      v-if="currentStep > 1"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      @click="$emit('previous')"
    >
      <svg class="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Précédent
    </button>
    <div class="flex-1" />

    <!-- Bouton Suivant ou Confirmer -->
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
      @click="currentStep === totalSteps ? $emit('submit') : $emit('next')"
    >
      <template v-if="currentStep < totalSteps">
        <span>Suivant</span>
        <svg class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </template>
      <template v-else>
        <span>Confirmer la réservation</span>
        <svg class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </template>
    </button>
  </div>
</template>