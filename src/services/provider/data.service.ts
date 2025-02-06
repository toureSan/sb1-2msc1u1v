import { supabase } from '@/lib/supabase'
import { mapProviderData } from './mapper'
import type { Provider } from '@/types/provider'

export const providerDataService = {
  async getProviderById(id: string): Promise<Provider | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .eq('role', 'provider')
      .single()

    if (error || !data) return null
    return mapProviderData(data)
  },

  async getProvidersByCategory(category: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'provider')
      .contains('services', [category])

    if (error || !data) return []
    return data.map(mapProviderData)
  },

  async updateProviderProfile(id: string, profile: Partial<Provider>): Promise<Provider | null> {
    const { data, error } = await supabase
      .from('users')
      .update(profile)
      .eq('id', id)
      .eq('role', 'provider')
      .single()

    if (error || !data) return null
    return mapProviderData(data)
  }
}