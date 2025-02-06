<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const statsRefs = ref<HTMLElement[]>([])

const stats = [
  {
    title: 'Trouvez le bon prestataire en quelques clics',
    description: 'Nous sélectionnons rigoureusement nos prestataires pour garantir des services de haute qualité',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'Des tarifs transparents et abordables',
    description: 'Nos prestataires s\'engagent à pratiquer des tarifs justes et transparents',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'Une communauté de confiance',
    description: 'Tous nos prestataires sont vérifiés et évalués par la communauté',
    image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
]

onMounted(() => {
  // Animation du titre
  gsap.from(sectionRef.value?.querySelector('h2'), {
    scrollTrigger: {
      trigger: sectionRef.value?.querySelector('h2'),
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1
  })

  // Animation de la description
  gsap.from(sectionRef.value?.querySelector('p.text-xl'), {
    scrollTrigger: {
      trigger: sectionRef.value?.querySelector('p.text-xl'),
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3
  })

  // Animation des stats
  statsRefs.value.forEach((statRef, index) => {
    const direction = index % 2 === 0 ? -100 : 100
    
    gsap.from(statRef, {
      scrollTrigger: {
        trigger: statRef,
        start: 'top 70%',
      },
      x: direction,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="bg-white py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Comment ça marche
          </h2>
          <p class="text-xl text-gray-600 mb-16">
            Une plateforme simple et efficace pour tous vos besoins de services
          </p>
        </div>

        <div class="space-y-16">
          <div 
            v-for="(item, index) in stats" 
            :key="index"
            ref="statsRefs"
            class="flex flex-col lg:flex-row gap-8 items-center"
            :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
          >
            <!-- Image -->
            <div class="w-full lg:w-1/2">
              <div class="relative rounded-2xl overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="w-full lg:w-1/2">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                {{ item.title }}
              </h3>
              <p class="text-lg text-gray-600">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>