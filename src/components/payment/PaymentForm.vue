<script setup lang="ts">
import { ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps<{
  amount: number
  serviceName: string
}>()

const emit = defineEmits(['success', 'error'])
const isLoading = ref(false)
const cardNumber = ref('')
const expiryDate = ref('')
const cvc = ref('')

const handlePayment = async () => {
  try {
    isLoading.value = true
    
    // Simuler un paiement réussi pour la démo
    setTimeout(() => {
      emit('success')
      isLoading.value = false
    }, 1500)
  } catch (error) {
    emit('error', 'Le paiement a échoué')
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900">Détails du paiement</h3>
      <p class="mt-1 text-sm text-gray-500">
        Montant total: {{ amount }}€
      </p>
      <p class="text-sm text-gray-500">
        Service: {{ serviceName }}
      </p>
    </div>

    <form @submit.prevent="handlePayment" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Numéro de carte
        </label>
        <input
          v-model="cardNumber"
          type="text"
          placeholder="4242 4242 4242 4242"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Date d'expiration
          </label>
          <input
            v-model="expiryDate"
            type="text"
            placeholder="MM/YY"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input
            v-model="cvc"
            type="text"
            placeholder="123"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {{ isLoading ? 'Traitement...' : 'Payer' }}
      </button>
    </form>
  </div>
</template>