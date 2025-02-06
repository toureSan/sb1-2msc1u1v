import { supabase } from '@/lib/supabase'
import type { AuthState } from './types'

export function setupAuthListeners(state: AuthState) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      state.user.value = null
    }
  })

  return () => {
    subscription.unsubscribe()
  }
}