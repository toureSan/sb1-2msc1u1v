<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps<{
  title: string
  message: string
}>()

onMounted(() => {
  const duration = 3 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 10000, // Augmentation du z-index pour être au-dessus de la modal
    disableForReducedMotion: true
  }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    
    // Ajustement des positions de départ pour mieux correspondre à la modal
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.3, 0.4), y: 0.5 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.7), y: 0.5 }
    })
  }, 250)
})
</script>

<template>
  <div class="text-center relative z-[9999]"> <!-- Augmentation du z-index -->
    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
      <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 class="mt-3 text-lg font-medium text-gray-900">{{ title }}</h3>
    <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
  </div>
</template>