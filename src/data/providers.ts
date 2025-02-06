import type { Provider } from '@/types/provider'

export const initialProviders: Provider[] = [
  {
    id: 'p1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    phone: '0123456789',
    address: '1 rue des Services, Meyrin',
    profile_picture_url: 'https://randomuser.me/api/portraits/women/1.jpg',
    service_description: 'Service de nettoyage professionnel',
    service_rate: 35,
    service_radius: 20,
    experience_description: '5 ans d\'expérience',
    certifications: ['Certification Pro'],
    provider_references: ['Excellent service'],
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true
    },
    start_date: '2024-01-01',
    services: ['Ménage', 'Repassage'],
    rating: 4.8
  },
  {
    id: 'p2',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@example.com',
    phone: '0123456789',
    address: '2 rue des Artisans, Meyrin',
    profile_picture_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    service_description: 'Jardinage et entretien extérieur',
    service_rate: 45,
    service_radius: 15,
    experience_description: '3 ans d\'expérience',
    certifications: ['Certification Jardinage'],
    provider_references: ['Travail soigné'],
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true
    },
    start_date: '2024-01-01',
    services: ['Jardinage', 'Bricolage'],
    rating: 4.9
  }
]

export const providers = initialProviders