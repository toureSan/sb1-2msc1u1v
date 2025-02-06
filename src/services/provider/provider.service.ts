import type { Provider } from '@/types/provider'
import { initialProviders } from '@/data/providers'

export const providerService = {
  async getProviders(): Promise<Provider[]> {
    try {
      // TODO: Implement actual data storage
      return initialProviders
    } catch (error) {
      console.error('Provider service error:', error)
      throw error
    }
  },

  async getProviderById(id: string): Promise<Provider | null> {
    try {
      return initialProviders.find(p => p.id === id) || null
    } catch (error) {
      console.error('Error fetching provider:', error)
      return null
    }
  }
}