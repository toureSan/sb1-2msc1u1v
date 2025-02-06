export interface Service {
  id: string
  title: string
  category: string
  price: number
  provider: {
    id: string
    name: string
    profile_picture_url?: string
    rating: number
  }
  location: {
    lat: number
    lng: number
  }
}