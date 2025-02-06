<script setup lang="ts">
import { ShieldCheckIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Prestataires Vérifiés',
    description: 'Chaque prestataire est minutieusement vérifié pour votre tranquillité d\'esprit.',
    icon: ShieldCheckIcon
  },
  {
    name: 'Réservation Instantanée',
    description: 'Réservez des services à votre convenance avec notre système de réservation en temps réel.',
    icon: ClockIcon
  },
  {
    name: 'Experts Locaux',
    description: 'Trouvez des professionnels qualifiés dans votre quartier qui connaissent votre région.',
    icon: MapPinIcon
  },
  {
    name: 'Prix Transparents',
    description: 'Des tarifs clairs sans frais cachés. Payez uniquement pour les services dont vous avez besoin.',
    icon: CurrencyDollarIcon
  }
]
</script>

<template>
  <section class="bg-white py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pourquoi Nous Choisir</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Nous vous mettons en relation avec des professionnels de confiance qui délivrent un service de qualité à votre porte.
        </p>
      </div>
      <!-- Rest of the template remains the same -->
    </div>
  </section>
</template>