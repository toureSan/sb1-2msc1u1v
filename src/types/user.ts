export interface User {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: 'client' | 'provider'
  profile_picture_url?: string | null
  created_at: string
}

export interface UserRegistrationData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'client' | 'provider'
}