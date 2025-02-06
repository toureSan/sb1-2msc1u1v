import type { Service } from '@/types/service'

export const initialServices: Service[] = [
  {
    id: '1',
    title: 'Aide ménagère professionnelle',
    category: 'Ménage',
    price: 35,
    provider: {
      id: 'p1',
      name: 'Marie Dupont',
      profile_picture_url: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.8
    },
    location: {
      lat: 46.2340,
      lng: 6.0692
    }
  },
  {
    id: '2',
    title: 'Jardinage et entretien extérieur',
    category: 'Jardinage',
    price: 45,
    provider: {
      id: 'p2',
      name: 'Pierre Martin',
      profile_picture_url: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.9
    },
    location: {
      lat: 46.2335,
      lng: 6.0745
    }
  },
  {
    id: '3',
    title: 'Courses et accompagnement',
    category: 'Services',
    price: 30,
    provider: {
      id: 'p3',
      name: 'Sophie Laurent',
      profile_picture_url: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.7
    },
    location: {
      lat: 46.2291,
      lng: 6.0631
    }
  },
  {
    id: '4',
    title: 'Bricolage et petites réparations',
    category: 'Bricolage',
    price: 50,
    provider: {
      id: 'p4',
      name: 'Marc Dubois',
      profile_picture_url: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4.9
    },
    location: {
      lat: 46.2314,
      lng: 6.0734
    }
  },
  {
    id: '5',
    title: 'Garde d\'enfants',
    category: 'Garde d\'enfants',
    price: 28,
    provider: {
      id: 'p5',
      name: 'Julie Moreau',
      profile_picture_url: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4.8
    },
    location: {
      lat: 46.2368,
      lng: 6.0657
    }
  }
]

export const services = initialServices