import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function initSupabase() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    return null
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,   // Désactivation du rafraîchissement automatique des tokens
        persistSession: false,     // Désactivation de la persistance des sessions
        detectSessionInUrl: false  // Désactivation de la détection automatique des sessions dans l'URL
      },
      db: {
        schema: 'public'
      }
    })

    return supabaseClient
  } catch (error) {
    console.error('Supabase client creation error:', error)
    return null
  }
}

export function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = initSupabase()
  }
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized')
  }
  return supabaseClient
}

// Export the initialized client
export const supabase = getSupabase()
