import { ref, watch } from 'vue'
import type { Provider } from '@/types/provider'
import { useSearchQuery } from './useSearchQuery'
import { useCategoryFilter } from './useCategoryFilter'
import { filterProvidersBySearch, filterProvidersByCategory } from '@/utils/filters/providerFilters'

export function useProviderSearch(initialProviders: Provider[]) {
  const { searchQuery, updateSearch } = useSearchQuery()
  const { selectedCategory, updateCategory } = useCategoryFilter()
  const filteredProviders = ref<Provider[]>(initialProviders)

  watch([searchQuery, selectedCategory], () => {
    let result = [...initialProviders]

    if (searchQuery.value) {
      result = filterProvidersBySearch(result, searchQuery.value)
    }

    if (selectedCategory.value !== 'all') {
      result = filterProvidersByCategory(result, selectedCategory.value)
    }

    filteredProviders.value = result
  }, { immediate: true })

  return {
    filteredProviders,
    updateSearch,
    updateCategory
  }
}