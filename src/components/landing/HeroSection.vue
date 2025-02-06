<template>
  <div class="relative bg-white">
    <div class="relative">
      <!-- Image de fond avec overlay noir -->
      <div class="absolute inset-0">
        <img
          class="h-[400px] w-full object-cover"
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Services à domicile"
        >
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <!-- Contenu -->
      <div class="relative h-[400px] flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl space-y-8">
            <h1 class="text-6xl md:text-7xl font-bold red-500">
              Vos services
              <br />
              à portée de main
            </h1>
            <p class="text-xl md:text-2xl text-gray-200">
              Trouvez des travailleurs de confiance pour tous vos besoins du quotidien. Des services à domicile aux services en extérieur en passant par les services de soutien émotionnel et de partage d'activités sans oublier vos animaux de compagnie. Faites appel à des prestataires aux profils vérifiés près de chez vous.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6">
              <button
                type="button"
                @click="router.push('/explore')"
                class="inline-flex items-center px-8 py-4 text-xl border-2 border-white rounded-lg text-white hover:bg-white hover:text-black transition-colors"
              >
                <span>Rechercher un service</span>
              </button>
              <button
                type="button"
                @click="router.push('/provider')"
                class="inline-flex items-center px-8 py-4 text-xl bg-white rounded-lg text-black hover:bg-gray-100 transition-colors"
              >
                <span>Devenir prestataire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>