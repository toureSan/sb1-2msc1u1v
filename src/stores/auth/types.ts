import type { User } from '@/types/user'
import type { Ref } from 'vue'

export interface AuthState {
  user: Ref<User | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  initialized: Ref<boolean>
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'client' | 'provider'
}