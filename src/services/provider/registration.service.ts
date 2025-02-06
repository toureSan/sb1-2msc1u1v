import { supabase } from '@/lib/supabase'
import type { ProviderRegistration } from '@/types/provider'
import { ProviderError, PROVIDER_ERRORS } from './errors'
import { providerStorageService } from './storage.service'
import { validateProviderData } from './validation'

export const providerRegistrationService = {
  async registerProvider(data: ProviderRegistration) {
    try {
      // Validate all required data
      const validationError = validateProviderData(data)
      if (validationError) {
        throw new ProviderError(validationError)
      }

      // Upload profile picture if provided
      let profilePictureUrl = null
      if (data.personal.profilePicture) {
        try {
          const providerId = crypto.randomUUID()
          profilePictureUrl = await providerStorageService.uploadProfilePicture(
            data.personal.profilePicture,
            providerId
          )
        } catch (error) {
          console.error('Profile picture upload error:', error)
          // Continue without profile picture
        }
      }

      // Create provider directly in providers table
      const { data: provider, error: providerError } = await supabase
        .from('providers')
        .insert([{
          first_name: data.personal.firstName,
          last_name: data.personal.lastName,
          email: data.personal.email,
          phone: data.personal.phone || null,
          address: data.personal.address || null,
          profile_picture_url: profilePictureUrl,
          service_description: data.service.description || null,
          service_rate: data.service.rate || null,
          service_radius: data.service.radius || null,
          experience_description: data.qualifications.experience || null,
          certifications: data.qualifications.certifications || [],
          provider_references: data.qualifications.references || [],
          schedule: data.availability.schedule || {},
          start_date: data.availability.startDate || null,
          services: data.service.categories,
          status: 'pending'
        }])
        .select()
        .single()

      if (providerError) {
        console.error('Provider creation error:', providerError)
        if (providerError.code === '23505') { // Unique violation
          throw new ProviderError(PROVIDER_ERRORS.EMAIL_EXISTS)
        }
        throw new ProviderError(PROVIDER_ERRORS.REGISTRATION_FAILED)
      }

      if (!provider) {
        throw new ProviderError(PROVIDER_ERRORS.REGISTRATION_FAILED)
      }

      return { provider }
    } catch (error) {
      console.error('Provider registration error:', error)
      if (error instanceof ProviderError) {
        throw error
      }
      throw new ProviderError(PROVIDER_ERRORS.REGISTRATION_FAILED)
    }
  }
}