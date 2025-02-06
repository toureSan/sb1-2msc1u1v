import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import { useNotification } from '@/composables/useNotification'
import type { Service } from '@/types/service'

interface BookingConfirmationProps {
  service: {
    id: string
    title: string
    price: number
    provider: {
      id: string
      name: string
    }
  }
  dateTime: string
  duration: number
  location: string
  specialRequests: string
}

export function useBookingConfirmation(props: BookingConfirmationProps, emit: (event: 'close') => void) {
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

      const booking = {
        serviceId: props.service.id,
        providerId: props.service.provider.id,
        clientId: authStore.user?.id,
        dateTime: props.dateTime,
        duration: props.duration,
        location: props.location,
        specialRequests: props.specialRequests,
        totalPrice: totalPrice.value,
        status: 'pending'
      }

      await bookingsStore.createBooking(booking)
      showSuccess.value = true
      
      setTimeout(() => {
        emit('close')
        router.push('/dashboard/client')
      }, 3000)
    } catch (error) {
      addNotification('error', 'Erreur lors de la réservation')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    showSuccess,
    isSubmitting,
    totalPrice,
    handleSubmit
  }
}