<script setup lang="ts">
const testimonials = [
  {
    content: "J'ai trouvé une femme de ménage exceptionnelle. Le service est vraiment professionnel !",
    author: "Marie Dubois",
    role: "Cliente",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    content: "En tant que prestataire, cette plateforme m'a permis de trouver des clients formidables.",
    author: "Thomas Martin",
    role: "Prestataire de services",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  }
]
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Témoignages</h2>
        <p class="mt-4 text-xl text-gray-600">Ce que disent nos utilisateurs</p>
      </div>
      <div class="mt-12 grid gap-8 md:grid-cols-2">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-sm"
        >
          <p class="text-gray-600 italic">"{{ testimonial.content }}"</p>
          <div class="mt-4 flex items-center">
            <img
              :src="testimonial.image"
              :alt="testimonial.author"
              class="h-12 w-12 rounded-full"
            >
            <div class="ml-4">
              <h4 class="text-lg font-medium text-gray-900">{{ testimonial.author }}</h4>
              <p class="text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>