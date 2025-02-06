```typescript
import { ref, computed, watch } from 'vue'
import type { Provider } from '@/types/provider'
import { CATEGORIES } from '@/utils/constants'

export const useProviderSearch = (providers: Provider[]) => {
  const searchQuery = ref('')
  const selectedCategory = ref(CATEGORIES[0].id)
  const filteredProviders = ref<Provider[]>(providers)

  // Watch for changes in search query and category
  watch([searchQuery, selectedCategory], () => {
    let result = [...providers]

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(provider => 
        provider.firstName.toLowerCase().includes(query) ||
        provider.lastName.toLowerCase().includes(query) ||
        provider.service_description?.toLowerCase().includes(query) ||
        provider.services.some(service => service.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory.value !== 'all') {
      result = result.filter(provider =>
        provider.services.some(service => 
          service.toLowerCase() === selectedCategory.value.toLowerCase()
        )
      )
    }

    filteredProviders.value = result
  })

  // Watch for changes in providers prop
  watch(() => providers, (newProviders) => {
    filteredProviders.value = newProviders
  }, { deep: true })

  const updateSearch = (query: string) => {
    searchQuery.value = query
  }

  const updateCategory = (category: string) => {
    selectedCategory.value = category
  }

  return {
    searchQuery,
    selectedCategory,
    filteredProviders,
    updateSearch,
    updateCategory
  }
}
```