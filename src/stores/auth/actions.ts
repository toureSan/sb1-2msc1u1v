import { supabase } from '@/lib/supabase'
import { authService } from '@/services/auth'
import { AuthError, AUTH_ERRORS } from '@/services/auth/errors'
import type { AuthState, LoginCredentials, SignUpData } from './types'

export function useAuthActions(state: AuthState) {
  async function initAuth() {
    if (state.initialized.value) return
    
    try {
      state.isLoading.value = true
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          
        if (userData) {
          state.user.value = {
            id: userData.id,
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            role: userData.role,
            profile_picture_url: userData.profile_picture_url,
            created_at: userData.created_at
          }
        }
      }
    } catch (err) {
      console.error('Auth initialization error:', err)
      state.error.value = 'Failed to initialize authentication'
    } finally {
      state.initialized.value = true
      state.isLoading.value = false
    }
  }

  async function register(data: SignUpData) {
    try {
      state.isLoading.value = true
      state.error.value = null

      const { user } = await authService.signUp(data)
      state.user.value = user

      return true
    } catch (err) {
      state.error.value = err instanceof AuthError ? err.message : AUTH_ERRORS.SIGNUP_FAILED
      throw err
    } finally {
      state.isLoading.value = false
    }
  }

  async function login(credentials: LoginCredentials) {
    try {
      state.isLoading.value = true
      state.error.value = null
      
      const { user } = await authService.signIn(credentials)
      state.user.value = user
      
      return true
    } catch (err) {
      state.error.value = err instanceof AuthError ? err.message : AUTH_ERRORS.GENERIC_ERROR
      throw err
    } finally {
      state.isLoading.value = false
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut()
      state.user.value = null
    } catch (err) {
      console.error('Logout error:', err)
      throw err
    }
  }

  return {
    initAuth,
    register,
    login,
    logout
  }
}