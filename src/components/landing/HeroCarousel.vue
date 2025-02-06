<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, ref } from 'vue'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Livreur professionnel',
    category: 'Livraison'
  },
  {
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Jardinier professionnel',
    category: 'Jardinage'
  },
  {
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Femme de ménage professionnelle',
    category: 'Ménage'
  }
]

const currentSlide = ref(0)
const timer = ref<number | null>(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const startAutoplay = () => {
  timer.value = window.setInterval(nextSlide, 5000)
}

const stopAutoplay = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Images -->
    <div 
      v-for="(slide, index) in slides" 
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="{ 'opacity-0': currentSlide !== index }"
    >
      <img
        :src="slide.image"
        :alt="slide.alt"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Navigation buttons -->
    <button
      @click="prevSlide"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>

    <button
      @click="nextSlide"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="currentSlide = index"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
        class="w-2 h-2 rounded-full transition-all"
        :class="currentSlide === index ? 'bg-white w-4' : 'bg-white/50'"
      />
    </div>

    <!-- Category label -->
    <div class="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm z-20">
      {{ slides[currentSlide].category }}
    </div>
  </div>
</template>