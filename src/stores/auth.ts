import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  
  const isAuthenticated = computed(() => !!user.value)
  const isProvider = computed(() => user.value?.role === 'provider')

  async function initAuth() {
    // TODO: Implement local auth
    initialized.value = true
  }

  async function login(credentials: { email: string; password: string }) {
    try {
      isLoading.value = true
      error.value = null
      
      // TODO: Implement local auth
      
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Authentication error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    user.value = null
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isProvider,
    initAuth,
    login,
    logout
  }
})