<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const sectionRef = ref(null)

const services = [
  {
    title: 'Bricolage',
    description: "Particulièrement utile pour réaliser vos aménagements et réparer ce qui s'abîme avec le temps.",
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'Jardinage',
    description: 'Un jardin soigné offre un lieu de détente et de sérénité, idéal pour le bien-être de la famille.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'Déménagement',
    description: 'Faciliter le déménagement et alléger le stress émotionnel pour les membres de la famille.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
]

onMounted(() => {
  gsap.from(sectionRef.value?.querySelector('h2'), {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1
  })

  const cards = sectionRef.value?.querySelectorAll('.service-card')
  cards?.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: index * 0.2
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold text-center mb-16">
        Améliorez votre qualité de vie avec les services à domicile
      </h2>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="service in services" 
          :key="service.title"
          class="service-card relative group overflow-hidden rounded-2xl"
        >
          <img 
            :src="service.image" 
            :alt="service.title"
            class="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-8 flex flex-col justify-end">
            <h3 class="text-3xl font-bold text-white mb-3">{{ service.title }}</h3>
            <p class="text-gray-200 mb-6">{{ service.description }}</p>
            <button 
              @click="router.push('/explore')"
              class="inline-flex items-center text-white font-medium group"
            >
              Découvrir
              <svg 
                class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>