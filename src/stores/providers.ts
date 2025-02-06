import { defineStore } from 'pinia'
import { ref } from 'vue'
import { providerService } from '@/services/provider'
import type { Provider } from '@/types/provider'

export const useProvidersStore = defineStore('providers', () => {
  const providers = ref<Provider[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadProviders() {
    try {
      isLoading.value = true
      error.value = null
      providers.value = await providerService.getProviders()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    providers,
    isLoading,
    error,
    loadProviders
  }
})