```typescript
import { supabase } from '@/lib/supabase'
import type { Provider } from '@/types/provider'
import type { Service } from '@/types/service'

export const providerService = {
  async getProviders() {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        first_name,
        last_name,
        email,
        role,
        provider_status,
        phone,
        address,
        profile_picture_url,
        service_description,
        service_rate,
        service_radius,
        experience_description,
        certifications,
        provider_references,
        schedule,
        start_date,
        services,
        rating
      `)
      .eq('role', 'provider')
      .eq('provider_status', 'approved')

    if (error) throw new Error('Erreur lors de la récupération des prestataires')

    return data.map(this.mapProviderData)
  },

  mapProviderData(data: any): Provider {
    // Create a service for each provider category
    const services: Service[] = (data.services || []).map((category: string) => ({
      id: ['service', data.id, category].join('-'),
      title: category,
      description: data.service_description || '',
      category: category,
      price: data.service_rate || 0,
      provider: {
        id: data.id,
        name: [data.first_name, data.last_name].join(' '),
        profile_picture_url: data.profile_picture_url || null,
        rating: data.rating || 4.5
      },
      location: {
        lat: 46.2324,
        lng: 6.0683
      }
    }))

    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      profile_picture_url: data.profile_picture_url || null,
      service_description: data.service_description || '',
      service_rate: data.service_rate || 0,
      service_radius: data.service_radius || 0,
      experience_description: data.experience_description || '',
      certifications: data.certifications || [],
      provider_references: data.provider_references || [],
      schedule: data.schedule || {},
      start_date: data.start_date || '',
      services,
      rating: data.rating || 4.5
    }
  }
}
```