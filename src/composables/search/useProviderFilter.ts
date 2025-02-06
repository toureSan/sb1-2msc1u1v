import { ref, watch, type Ref } from 'vue'
import type { Provider } from '@/types/provider'
import { filterProvidersBySearch, filterProvidersByCategory } from '@/utils/filters/providerFilters'

export function useProviderFilter(
  providers: Provider[],
  searchQuery: Ref<string>,
  selectedCategory: Ref<string>
) {
  const filteredProviders = ref<Provider[]>(providers)

  // Watch for changes in search query and category
  watch([searchQuery, selectedCategory], () => {
    let result = [...providers]

    if (searchQuery.value) {
      result = filterProvidersBySearch(result, searchQuery.value)
    }

    if (selectedCategory.value !== 'all') {
      result = filterProvidersByCategory(result, selectedCategory.value)
    }

    filteredProviders.value = result
  }, { immediate: true })

  // Watch for changes in providers
  watch(() => providers, (newProviders) => {
    filteredProviders.value = newProviders
  }, { immediate: true })

  return {
    filteredProviders
  }
}