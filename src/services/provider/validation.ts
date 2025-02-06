import type { ProviderRegistration } from '@/types/provider'
import { PROVIDER_ERRORS } from './errors'

export function validateProviderData(data: ProviderRegistration): string | null {
  // Personal info validation
  if (!data.personal.firstName?.trim() || !data.personal.lastName?.trim()) {
    return 'Le nom et le prénom sont requis'
  }

  if (!data.personal.email?.trim()) {
    return 'L\'email est requis'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) {
    return 'L\'email est invalide'
  }

  if (!data.personal.phone?.trim()) {
    return 'Le numéro de téléphone est requis'
  }

  if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(data.personal.phone)) {
    return 'Le numéro de téléphone est invalide'
  }

  if (!data.personal.address?.trim()) {
    return 'L\'adresse est requise'
  }

  // Service info validation
  if (!data.service.categories?.length) {
    return 'Sélectionnez au moins une catégorie de service'
  }

  if (!data.service.description?.trim()) {
    return 'La description du service est requise'
  }

  if (!data.service.rate || data.service.rate < 15 || data.service.rate > 150) {
    return 'Le tarif horaire doit être compris entre 15€ et 150€'
  }

  if (!data.service.radius || data.service.radius < 1 || data.service.radius > 100) {
    return 'Le rayon d\'intervention doit être compris entre 1 et 100 km'
  }

  // Qualifications validation
  if (!data.qualifications.experience?.trim()) {
    return 'La description de l\'expérience est requise'
  }

  // Availability validation
  if (!data.availability.startDate) {
    return 'La date de début est requise'
  }

  const startDate = new Date(data.availability.startDate)
  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)

  if (startDate < today) {
    return 'La date de début ne peut pas être dans le passé'
  }

  if (startDate > maxDate) {
    return 'La date de début ne peut pas être à plus de 3 mois'
  }

  if (!data.availability.schedule || !Object.values(data.availability.schedule).some(Boolean)) {
    return 'Sélectionnez au moins un jour de disponibilité'
  }

  return null
}