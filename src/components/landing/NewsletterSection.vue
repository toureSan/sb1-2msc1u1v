<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const sectionRef = ref<HTMLElement | null>(null)

const handleJoin = () => {
  router.push('/provider')
}

onMounted(() => {
  // Animation de l'image
  gsap.from(sectionRef.value?.querySelector('.absolute.left-0'), {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out'
  })

  // Animation du contenu
  gsap.from(sectionRef.value?.querySelector('.lg\\:w-2\\/3'), {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5
  })
})
</script>

<template>
  <section ref="sectionRef" class="relative bg-blue-800 py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl bg-blue-900 px-8 py-24">
        <!-- Image de fond stylisée -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 opacity-90"></div>
        
        <!-- Image de l'homme qui dépasse -->
        <div class="absolute left-0 bottom-0 lg:-left-12 lg:-bottom-12 w-[400px] h-[500px] overflow-visible">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Service client"
            class="w-full h-full object-cover transform scale-125 origin-bottom-left"
          />
        </div>
        
        <!-- Contenu -->
        <div class="relative flex flex-col lg:flex-row items-center justify-end gap-12 lg:ml-[300px]">
          <div class="lg:w-2/3">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Rejoignez nous en tant que prestataire wimmers
            </h2>
            <p class="mt-4 text-lg text-blue-100">
              Nos experts vous répondent dans les 5 min par chat, dans la journée par email ou vous appellent si vous préférez échanger de vive voix.
            </p>
        
            <button
              @click="handleJoin"
              class="mt-8 inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white hover:text-blue-900 transition-colors text-lg font-medium"
            >
              Nous rejoindre
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>