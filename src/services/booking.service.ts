import type { Booking } from '@/types/booking'

export const bookingService = {
  async createBooking(bookingData: Partial<Booking>) {
    try {
      // TODO: Implement local storage for bookings
      return {
        id: 'mock-booking-id',
        ...bookingData,
        created_at: new Date().toISOString(),
        status: 'pending'
      }
    } catch (error) {
      console.error('Booking creation error:', error)
      throw new Error('Erreur lors de la création de la réservation')
    }
  },

  async getUserBookings(userId: string) {
    try {
      // TODO: Implement local storage for bookings
      return []
    } catch (error) {
      console.error('Get user bookings error:', error)
      throw new Error('Erreur lors de la récupération des réservations')
    }
  }
}