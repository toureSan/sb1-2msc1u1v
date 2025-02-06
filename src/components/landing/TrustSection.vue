<template>
  <section class="relative isolate overflow-hidden bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center" ref="titleRef">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl opacity-0 transform translate-y-10">
            Nous Améliorons le Quotidien
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-600 opacity-0 transform translate-y-10">
            Rejoignez-nous dès maintenant ! Quelque soit vos besoins, vous ne serez plus jamais seuls!
          </p>
        </div>

        <!-- Engagements -->
        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Qualité -->
          <div class="card bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow opacity-0 transform translate-x-[-50px]">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <StarIcon class="h-6 w-6 text-indigo-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Qualité garantie</h3>
            <p class="text-gray-600">
              Nous sélectionnons rigoureusement nos prestataires pour garantir des services de haute qualité et une expérience client exceptionnelle.
            </p>
          </div>

          <!-- Confiance -->
          <div class="card bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow opacity-0 transform translate-y-[50px]">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheckIcon class="h-6 w-6 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Confiance et sécurité</h3>
            <p class="text-gray-600">
              La sécurité et la confiance sont au cœur de notre plateforme, avec des vérifications approfondies.
            </p>
          </div>

          <!-- Équité -->
          <div class="card bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow opacity-0 transform translate-x-[50px]">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <ScaleIcon class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Équité et transparence</h3>
            <p class="text-gray-600">
              Nous assurons une tarification juste et transparente pour tous, sans frais cachés ni surprises.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { StarIcon, ShieldCheckIcon, ScaleIcon } from '@heroicons/vue/24/outline'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)

onMounted(() => {
  // Animation du titre
  gsap.to(titleRef.value?.children, {
    scrollTrigger: {
      trigger: titleRef.value,
      start: 'top 80%',
    },
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })

  // Animation des cartes
  const cards = document.querySelectorAll('.card')
  cards.forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      delay: index * 0.2,
      ease: 'power3.out'
    })
  })
})
</script>