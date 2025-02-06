<script setup lang="ts">
import { computed } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import { formatDate, formatTime } from '@/utils/date'
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  userId: string
  isProvider: boolean
}>()

const bookingsStore = useBookingsStore()

const bookings = computed(() => {
  return props.isProvider
    ? bookingsStore.getBookingsByProvider(props.userId)
    : bookingsStore.getBookingsByUser(props.userId)
})

const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'accepted': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    case 'completed': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente'
    case 'accepted': return 'Accepté'
    case 'rejected': return 'Refusé'
    case 'completed': return 'Terminé'
    default: return status
  }
}

const handleStatusUpdate = (bookingId: string, newStatus: string) => {
  bookingsStore.updateBookingStatus(bookingId, newStatus)
}
</script>

<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h2 class="text-lg font-medium text-gray-900">
        {{ isProvider ? 'Demandes de Services' : 'Mes Réservations' }}
      </h2>
    </div>
    
    <div class="border-t border-gray-200">
      <ul class="divide-y divide-gray-200">
        <li v-for="booking in bookings" :key="booking.id" class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">
                Service le {{ formatDate(booking.dateTime) }} à {{ formatTime(booking.dateTime) }}
              </p>
              <p class="text-sm text-gray-500">{{ booking.location }}</p>
              <p class="mt-1 text-sm text-gray-500">
                Durée: {{ booking.duration }}h - Prix: {{ formatPrice(booking.totalPrice) }}
              </p>
            </div>
            
            <div class="flex items-center space-x-4">
              <span
                class="px-2 py-1 text-xs rounded-full capitalize"
                :class="getStatusClass(booking.status)"
              >
                {{ getStatusText(booking.status) }}
              </span>
              
              <div v-if="isProvider && booking.status === 'pending'" class="flex space-x-2">
                <button
                  @click="handleStatusUpdate(booking.id, 'accepted')"
                  class="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Accepter
                </button>
                <button
                  @click="handleStatusUpdate(booking.id, 'rejected')"
                  class="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Refuser
                </button>
              </div>
              
              <button
                v-if="booking.status === 'accepted'"
                @click="handleStatusUpdate(booking.id, 'completed')"
                class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Marquer comme terminé
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>