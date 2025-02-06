export const CATEGORIES = [
  { id: 'all', name: 'Tous les services' },
  { id: 'menage', name: 'Ménage' },
  { id: 'jardinage', name: 'Jardinage' },
  { id: 'bricolage', name: 'Bricolage' },
  { id: 'courses', name: 'Courses' },
  { id: 'garde-enfants', name: 'Garde d\'enfants' }
] as const

export const MAP_CONFIG = {
  defaultCenter: [46.2324, 6.0683], // Centre de Meyrin
  defaultZoom: 14,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  }
} as const