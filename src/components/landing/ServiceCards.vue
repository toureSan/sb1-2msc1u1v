<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const sectionRef = ref(null)

const services = ref([
  {
    id: '1',
    title: 'Senior Care Specialist',
    description: 'Professional elderly care with medical background',
    category: 'Healthcare',
    price: 25,
    provider: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.8
    }
  },
  {
    id: '2',
    title: 'Home Cleaning Pro',
    description: 'Detailed home cleaning services',
    category: 'Cleaning',
    price: 22,
    provider: {
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9
    }
  },
  {
    id: '3',
    title: 'Garde d\'enfants',
    description: 'Garde d\'enfants à domicile et aide aux devoirs',
    category: 'Childcare',
    price: 28,
    provider: {
      name: 'Julie Moreau',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4.8
    }
  },
  {
    id: '4',
    title: 'Bricolage et réparations',
    description: 'Réparations diverses et montage de meubles',
    category: 'Handyman',
    price: 35,
    provider: {
      name: 'Marc Dubois',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.9
    }
  },
  {
    id: '5',
    title: 'Jardinage',
    description: 'Entretien de jardins et espaces verts',
    category: 'Gardening',
    price: 30,
    provider: {
      name: 'Pierre Martin',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4.7
    }
  }
])

onMounted(() => {
  // Animation du titre
  gsap.from(sectionRef.value?.querySelector('h2'), {
    scrollTrigger: {
      trigger: sectionRef.value?.querySelector('h2'),
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 1
  })

  // Animation des cartes
  const cards = document.querySelectorAll('.card')
  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power2.out'
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Découvrez nos prestataires de services les plus appréciés
        </h2>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="service in services" 
          :key="service.id" 
          class="card bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col sm:flex-row sm:items-start gap-4">
            <img
              :src="service.provider.avatar"
              :alt="service.provider.name"
              class="h-16 w-16 rounded-full object-cover mx-auto sm:mx-0"
            >
            <div class="flex-1 text-center sm:text-left">
              <h3 class="text-xl font-bold text-gray-900">{{ service.title }}</h3>
              <p class="text-gray-600">{{ service.provider.name }}</p>
              <div class="flex items-center justify-center sm:justify-start mt-1">
                <span class="text-yellow-400">★</span>
                <span class="ml-1 text-gray-600">{{ service.provider.rating }}</span>
              </div>
            </div>
            <div class="text-center sm:text-right mt-4 sm:mt-0">
              <p class="text-2xl font-bold text-black">{{ service.price }}€/h</p>
              <button
                @click="router.push('/explore')"
                class="mt-2 w-full sm:w-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Réserver
              </button>
            </div>
          </div>
          <p class="mt-4 text-gray-600 text-center sm:text-left">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>