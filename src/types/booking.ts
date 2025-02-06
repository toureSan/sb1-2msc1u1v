export interface Booking {
  id: string
  serviceId: string
  clientId: string
  providerId: string
  dateTime: string
  duration: number
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  totalPrice: number
  location: string
  specialRequests?: string
  createdAt: string
  service?: {
    id: string
    title: string
    price: number
  }
  provider?: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  client?: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}