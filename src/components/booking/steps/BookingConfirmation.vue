<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { useBookingsStore } from '@/stores/bookings'
import { useNotification } from '@/composables/useNotification'
import { formatPrice } from '@/utils/format'
import { formatDate, formatTime } from '@/utils/date'
import ConfirmationStep from './ConfirmationStep.vue'
import SuccessMessage from '@/components/success/SuccessMessage.vue'

const props = defineProps<{
  service: {
    id: string
    title: string
    price: number
    provider: {
      id: string
      name: string
    }
    location?: {
      lat: number
      lng: number
    }
  }
  dateTime: string
  duration: number
  location: string
  specialRequests: string
}>()

const emit = defineEmits(['close'])

const router = useRouter()
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()
const { addNotification } = useNotification()

const showSuccess = ref(false)
const isSubmitting = ref(false)

const totalPrice = computed(() => props.service.price * props.duration)

const handleSubmit = async () => {
  if (!authStore.isAuthenticated) {
    addNotification('error', 'Veuillez vous connecter pour effectuer une réservation')
    router.push('/login')
    return
  }

  try {
    isSubmitting.value = true

    const serviceData = {
      title: props.service.title,
      description: '',
      category: 'service',
      price: props.service.price,
      provider: {
        id: props.service.provider.id
      },
      location: props.service.location
    }

    const bookingData = {
      providerId: props.service.provider.id,
      clientId: authStore.user?.id,
      dateTime: props.dateTime,
      duration: props.duration,
      location: props.location,
      specialRequests: props.specialRequests,
      totalPrice: totalPrice.value,
      status: 'pending'
    }

    await bookingsStore.createBooking(bookingData, serviceData)
    showSuccess.value = true
    
    setTimeout(() => {
      emit('close')
      router.push('/dashboard/client')
    }, 3000)
  } catch (error) {
    console.error('Booking error:', error)
    addNotification('error', 'Erreur lors de la réservation')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div v-if="!showSuccess">
    <ConfirmationStep
      v-bind="props"
      :total-price="totalPrice"
    />

    <button
      @click="handleSubmit"
      :disabled="isSubmitting"
      class="mt-6 w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
    >
      {{ isSubmitting ? 'Confirmation en cours...' : 'Confirmer la réservation' }}
    </button>
  </div>

  <SuccessMessage
    v-else
    title="Réservation confirmée !"
    message="Votre demande a été envoyée avec succès au prestataire. Vous allez être redirigé vers votre tableau de bord."
  />
</template>