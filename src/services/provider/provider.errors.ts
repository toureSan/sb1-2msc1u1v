export class ProviderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProviderError'
  }
}

export const PROVIDER_ERRORS = {
  REGISTRATION_FAILED: 'Échec de l\'inscription',
  INVALID_DATA: 'Données d\'inscription invalides',
  PROFILE_FAILED: 'Échec de la création du profil'
} as const