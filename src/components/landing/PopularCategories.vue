<script setup lang="ts">
import {
  WrenchScrewdriverIcon,
  HomeIcon,
  TruckIcon,
  SparklesIcon,
  ShoppingBagIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const categories = [
  {
    name: 'Bricolage',
    description: 'Plomberie, électricité, réparations et installations',
    icon: WrenchScrewdriverIcon,
    count: '3 500+ prestataires'
  },
  {
    name: 'Ménage',
    description: 'Nettoyage professionnel de maisons et bureaux',
    icon: SparklesIcon,
    count: '2 800+ prestataires'
  },
  {
    name: 'Déménagement',
    description: 'Déménagement local, montage de meubles et livraisons',
    icon: TruckIcon,
    count: '1 500+ prestataires'
  },
  {
    name: 'Courses',
    description: 'Courses alimentaires et assistance personnelle',
    icon: ShoppingBagIcon,
    count: '2 000+ prestataires'
  },
  {
    name: 'Jardinage',
    description: 'Entretien du jardin, peinture et rénovation',
    icon: HomeIcon,
    count: '2 200+ prestataires'
  },
  {
    name: 'Services de soin',
    description: 'Garde d\'enfants, animaux et aide aux personnes âgées',
    icon: HeartIcon,
    count: '1 800+ prestataires'
  }
]
</script>

<template>
  <section class="bg-gray-50 py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Services Populaires</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Découvrez des professionnels de confiance pour tous vos besoins
        </p>
      </div>
      <!-- Rest of the template remains the same, just with French text -->
    </div>
  </section>
</template>