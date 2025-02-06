import { defineStore } from 'pinia'
import { computed, onUnmounted } from 'vue'
import { useAuthState } from './state'
import { useAuthActions } from './actions'
import { setupAuthListeners } from './listeners'

export const useAuthStore = defineStore('auth', () => {
  const state = useAuthState()
  const actions = useAuthActions(state)

  // Setup auth state listeners
  const cleanup = setupAuthListeners(state)
  onUnmounted(() => cleanup())

  // Computed properties
  const isAuthenticated = computed(() => !!state.user.value)
  const isProvider = computed(() => state.user.value?.role === 'provider')

  return {
    // State
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    // Computed
    isAuthenticated,
    isProvider,
    // Actions
    ...actions
  }
})

export * from './types'