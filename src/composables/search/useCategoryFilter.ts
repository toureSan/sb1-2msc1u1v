import { ref } from 'vue'
import { CATEGORIES } from '@/utils/constants'

export function useCategoryFilter() {
  const selectedCategory = ref(CATEGORIES[0].id)

  const updateCategory = (category: string) => {
    selectedCategory.value = category
  }

  return {
    selectedCategory,
    updateCategory
  }
}