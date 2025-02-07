<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-1">
      <!-- Section Hero avec carousel -->
      <div class="relative h-[100vh] sm:h-screen">
        <HeroCarousel />
        
        <!-- Contenu Hero -->
        <div class="absolute inset-0 flex items-center z-10">
          <div class="px-2 sm:px-8 lg:px-12">
            <div class="max-w-3xl space-y-8 sm:space-y-12">
              <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
                Des services à 360° degrés à portée de main !
              </h1>
              <p class="text-lg sm:text-xl md:text-2xl text-gray-200">
                Trouvez des travailleurs de confiance pour tous vos besoins du quotidien. Des services à domicile aux services en extérieur en passant par les services de soutien émotionnel et de partage d'activités sans oublier vos animaux de compagnie. Faites appel à des prestataires aux profils vérifiés près de chez vous.
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button
                  type="button"
                  @click="router.push('/explore')"
                  class="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-xl border-2 border-white rounded-lg text-white hover:bg-white hover:text-black transition-colors"
                >
                  <span>Rechercher un service</span>
                </button>
                <button
                  type="button"
                  @click="router.push('/provider')"
                  class="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-xl bg-white rounded-lg text-black hover:bg-gray-100 transition-colors"
                >
                  <span>Devenir prestataire</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Autres sections -->
      <TrustSection />
      <HowItWorks />
      <NewsletterSection />
      <ServiceCards />
      <HomeServices />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import {
  HowItWorks,
  TrustSection
} from '@/components/landing'
import ServiceCards from '@/components/landing/ServiceCards.vue'
import HomeServices from '@/components/landing/HomeServices.vue'
import HeroCarousel from '@/components/landing/HeroCarousel.vue'
import NewsletterSection from '@/components/landing/NewsletterSection.vue'

const router = useRouter()
</script>