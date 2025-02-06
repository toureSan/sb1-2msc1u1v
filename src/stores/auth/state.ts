import { ref } from 'vue'
import type { User } from '@/types/user'

export function useAuthState() {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  return {
    user,
    isLoading,
    error,
    initialized
  }
}