export interface Provider {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  profile_picture_url?: string
  service_description?: string
  service_rate?: number
  service_radius?: number
  experience_description?: string
  certifications?: string[]
  provider_references?: string[]
  schedule?: Record<string, boolean>
  start_date?: string
  services: string[]
  rating: number
}

export interface ProviderRegistration {
  personal: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    address?: string
    profilePicture?: File | null
  }
  service: {
    categories: string[]
    description?: string
    rate?: number | null
    radius?: number | null
  }
  qualifications: {
    experience?: string
    certifications?: string[]
    references?: string[]
  }
  availability: {
    schedule?: Record<string, boolean>
    startDate?: string
  }
}