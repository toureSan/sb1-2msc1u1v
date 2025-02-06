import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bookingService } from '@/services/booking/booking.service'
import type { Booking } from '@/types/booking'
import type { Service } from '@/types/service'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadUserBookings(userId: string) {
    try {
      isLoading.value = true
      error.value = null
      bookings.value = await bookingService.getUserBookings(userId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function createBooking(bookingData: Partial<Booking>, serviceData: Partial<Service>) {
    try {
      isLoading.value = true
      error.value = null
      
      const { booking } = await bookingService.createServiceAndBooking(serviceData, bookingData)
      bookings.value.unshift(booking)
      return booking
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  function getBookingsByUser(userId: string) {
    return bookings.value.filter(b => b.clientId === userId)
  }

  function getBookingsByProvider(providerId: string) {
    return bookings.value.filter(b => b.providerId === providerId)
  }

  return {
    bookings,
    isLoading,
    error,
    loadUserBookings,
    createBooking,
    getBookingsByUser,
    getBookingsByProvider
  }
})