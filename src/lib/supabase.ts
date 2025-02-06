import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function initSupabase() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return null
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
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