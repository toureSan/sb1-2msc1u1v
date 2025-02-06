import type { Provider } from '@/types/provider'
import type { ProviderData } from './types'

export function mapProviderData(data: ProviderData): Provider {
  return {
    id: data.id,
    firstName: data.first_name || '',
    lastName: data.last_name || '',
    email: data.email,
    phone: data.phone || undefined,
    address: data.address || undefined,
    profile_picture_url: data.profile_picture_url || undefined,
    service_description: data.service_description || undefined,
    service_rate: data.service_rate || undefined,
    service_radius: data.service_radius || undefined,
    experience_description: data.experience_description || undefined,
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    provider_references: Array.isArray(data.provider_references) ? data.provider_references : [],
    schedule: data.schedule || {},
    start_date: data.start_date || undefined,
    services: Array.isArray(data.services) ? data.services : [],
    rating: data.rating || 4.5
  }
}