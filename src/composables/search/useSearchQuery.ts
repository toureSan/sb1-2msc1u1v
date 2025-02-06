import { ref } from 'vue'

export function useSearchQuery() {
  const searchQuery = ref('')

  const updateSearch = (query: string) => {
    searchQuery.value = query
  }

  return {
    searchQuery,
    updateSearch
  }
}