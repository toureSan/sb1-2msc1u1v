<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1 bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl sm:text-center" ref="heroRef">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl opacity-0 transform translate-y-10">
              Nos formules d'abonnement
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600 opacity-0 transform translate-y-10">
              Choisissez la formule qui correspond le mieux à vos besoins et profitez de services de qualité à des tarifs avantageux.
            </p>
          </div>
        </div>
      </div>

      <!-- Pricing Section -->
      <div class="relative isolate mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          <!-- Basic Plan -->
          <div class="pricing-card flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 hover:shadow-lg transition-shadow opacity-0 transform translate-x-[-50px]">
            <div>
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-gray-900">Basic</h2>
                <p class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">Populaire</p>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">
                Idéal pour des besoins occasionnels
              </p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">9,99€</span>
                <span class="text-sm font-semibold leading-6 text-gray-600">/mois</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Contact avec 3 prestataires par mois
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Support client par email
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Annulation gratuite 24h avant
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Paiement sécurisé
                </li>
              </ul>
            </div>
            <button class="mt-8 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Commencer l'essai gratuit
            </button>
          </div>

          <!-- Premium Plan -->
          <div class="pricing-card flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 hover:shadow-lg transition-shadow opacity-0 transform translate-x-[50px]">
            <div>
              <div class="flex items-center justify-between gap-x-4">
                <h2 class="text-lg font-semibold leading-8 text-gray-900">Premium</h2>
                <p class="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold leading-5 text-green-600">Recommandé</p>
              </div>
              <p class="mt-4 text-sm leading-6 text-gray-600">
                Pour des besoins réguliers
              </p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">29,99€</span>
                <span class="text-sm font-semibold leading-6 text-gray-600">/mois</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Contact illimité avec les prestataires
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Support prioritaire 7j/7
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Annulation gratuite jusqu'à 12h avant
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Accès aux prestataires premium
                </li>
                <li class="flex gap-x-3">
                  <CheckIcon class="h-6 w-5 flex-none text-indigo-600" />
                  Paiement sécurisé
                </li>
              </ul>
            </div>
            <button class="mt-8 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Souscrire au plan Premium
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 ref="faqTitleRef" class="text-2xl font-bold leading-10 tracking-tight text-gray-900 opacity-0 transform translate-y-10">
            Questions fréquentes
          </h2>
          <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div v-for="(faq, index) in faqs" :key="index" :ref="el => faqRefs[index] = el" class="pt-6 opacity-0 transform translate-y-10">
              <dt class="text-lg font-semibold text-gray-900">{{ faq.question }}</dt>
              <dd class="mt-2 text-base text-gray-600">{{ faq.answer }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { CheckIcon } from '@heroicons/vue/24/solid'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const faqTitleRef = ref(null)
const faqRefs = ref([])

const faqs = [
  {
    question: 'Puis-je changer de forfait à tout moment ?',
    answer: 'Oui, vous pouvez changer de forfait à tout moment. Le changement prendra effet à la prochaine période de facturation.'
  },
  {
    question: 'Y a-t-il un engagement de durée ?',
    answer: 'Non, nos abonnements sont sans engagement. Vous pouvez annuler à tout moment.'
  },
  {
    question: 'Comment sont calculés les contacts avec les prestataires ?',
    answer: 'Un contact est comptabilisé lorsque vous initiez une conversation avec un prestataire. Les réponses du même prestataire ne sont pas décomptées.'
  }
]

onMounted(() => {
  // Animation du hero
  gsap.to(heroRef.value?.children, {
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top 80%',
    },
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })

  // Animation des cartes de prix
  const cards = document.querySelectorAll('.pricing-card')
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
      delay: index * 0.3,
      ease: 'power3.out'
    })
  })

  // Animation du titre FAQ
  gsap.to(faqTitleRef.value, {
    scrollTrigger: {
      trigger: faqTitleRef.value,
      start: 'top 80%',
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  })

  // Animation des questions FAQ
  faqRefs.value.forEach((faq, index) => {
    gsap.to(faq, {
      scrollTrigger: {
        trigger: faq,
        start: 'top 85%',
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power2.out'
    })
  })
})
</script>