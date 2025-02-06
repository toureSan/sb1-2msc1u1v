<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1 bg-white">
      <!-- Hero Section -->
      <div class="relative min-h-[80vh]">
        <div class="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Services à domicile"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div class="relative h-full flex items-center">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div class="max-w-3xl">
              <h1 class="text-4xl mt-32 font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-left">
                À propos de WIM
              </h1>
              <p class="mt-6 text-xl text-gray-300 text-left">
                WIM est une plateforme innovante tout-en-un qui transforme l'accès aux services du quotidien. Notre mission : répondre à des enjeux sociétaux majeurs en quelques clics.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Vision Section -->
      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-left">
            <h2 class="text-3xl font-bold text-gray-900">Notre vision</h2>
            <p class="mt-4 text-lg text-gray-600">
              Simplifier la vie de tous en rendant les services accessibles instantanément et de manière équitable.
            </p>
          </div>
        </div>
      </div>

      <!-- Engagements Section -->
      <div class="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-left">
            <h2 class="text-3xl font-bold text-gray-900">Nos engagements</h2>
            <p class="mt-4 text-lg text-gray-600">
              Des valeurs fortes qui guident nos actions pour un impact social positif.
            </p>
          </div>
          
          <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <!-- Qualité -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <StarIcon class="h-6 w-6 text-indigo-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Qualité garantie</h3>
              <p class="text-gray-600">
                Nous sélectionnons rigoureusement nos prestataires pour garantir des services de haute qualité et une expérience client exceptionnelle.
              </p>
            </div>

            <!-- Confiance -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheckIcon class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Confiance et sécurité</h3>
              <p class="text-gray-600">
                La sécurité et la confiance sont au cœur de notre plateforme, avec des vérifications approfondies et un système d'évaluation transparent.
              </p>
            </div>

            <!-- Équité -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <ScaleIcon class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Équité et transparence</h3>
              <p class="text-gray-600">
                Nous assurons une tarification juste et transparente pour tous, sans frais cachés ni surprises.
              </p>
            </div>

            <!-- Communauté -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <UserGroupIcon class="h-6 w-6 text-purple-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Esprit communautaire</h3>
              <p class="text-gray-600">
                Nous créons une communauté solidaire où chacun peut contribuer à améliorer la vie des autres.
              </p>
            </div>

            <!-- Bienveillance -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <HeartIcon class="h-6 w-6 text-red-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Bienveillance</h3>
              <p class="text-gray-600">
                Nous mettons l'humain au centre de nos préoccupations, avec une approche bienveillante et attentionnée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { 
  ScaleIcon,
  HeartIcon,
  UserGroupIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
</script>