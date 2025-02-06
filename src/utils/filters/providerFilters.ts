import type { Provider } from '@/types/provider'

/**
 * Filter providers based on search query
 */
export function filterProvidersBySearch(providers: Provider[], query: string): Provider[] {
  const searchQuery = query.toLowerCase()
  return providers.filter(provider => 
    provider.firstName.toLowerCase().includes(searchQuery) ||
    provider.lastName.toLowerCase().includes(searchQuery) ||
    provider.service_description?.toLowerCase().includes(searchQuery) ||
    provider.services.some(service => service.toLowerCase().includes(searchQuery))
  )
}

/**
 * Filter providers based on service category
 */
export function filterProvidersByCategory(providers: Provider[], category: string): Provider[] {
  if (category === 'all') return providers
  
  return providers.filter(provider =>
    provider.services.some(service => 
      service.toLowerCase() === category.toLowerCase()
    )
  )
}