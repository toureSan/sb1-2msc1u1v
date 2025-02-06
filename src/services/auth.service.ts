import { supabase } from '@/lib/supabase'
import type { User } from '@/types/user'

export const authService = {
  async signUp(email: string, password: string, userData: Partial<User>) {
    // Check if user exists first
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      throw new Error('Cet email est déjà utilisé')
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      if (authError.status === 422) {
        throw new Error('Cet email est déjà utilisé')
      }
      throw authError
    }

    if (!authData.user) {
      throw new Error('Échec de la création du compte')
    }

    // Create user profile
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role || 'client'
      })
      .select()
      .single()

    if (profileError) {
      // Cleanup auth user if profile creation fails
      await supabase.auth.signOut()
      throw new Error('Échec de la création du profil')
    }

    return { user: profileData }
  },

  // ... rest of the service remains the same
}