import { getSupabase } from '@/lib/supabase'
import { ProviderError, PROVIDER_ERRORS } from './errors'

export const providerStorageService = {
  async uploadProfilePicture(file: File, providerId: string): Promise<string | null> {
    try {
      const supabase = getSupabase()
      if (!supabase) {
        throw new ProviderError('Service temporairement indisponible')
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new ProviderError(PROVIDER_ERRORS.INVALID_FILE)
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new ProviderError(PROVIDER_ERRORS.INVALID_FILE)
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${providerId}/${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file)

      if (error) {
        console.error('Storage error:', error)
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Profile picture upload error:', error)
      // Return null instead of throwing to allow registration without picture
      return null
    }
  }
}