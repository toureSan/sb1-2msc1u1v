export interface ProviderData {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  phone?: string | null
  address?: string | null
  profile_picture_url?: string | null
  service_description?: string | null
  service_rate?: number | null
  service_radius?: number | null
  experience_description?: string | null
  certifications?: string[] | null
  provider_references?: string[] | null
  schedule?: Record<string, any> | null
  start_date?: string | null
  services?: string[] | null
  rating?: number | null
}

export interface ProviderQueryResult {
  data: ProviderData[] | null
  error: Error | null
}