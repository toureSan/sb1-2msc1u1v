export class ProviderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProviderError'
  }
}

export const PROVIDER_ERRORS = {
  REGISTRATION_FAILED: 'L\'inscription a échoué. Veuillez réessayer.',
  INVALID_DATA: 'Certaines informations requises sont manquantes.',
  PROFILE_FAILED: 'La création du profil a échoué.',
  UPLOAD_FAILED: 'L\'upload de la photo de profil a échoué.',
  INVALID_FILE: 'Le fichier doit être une image de moins de 5MB.',
  EMAIL_EXISTS: 'Cette adresse email est déjà utilisée.'
} as const