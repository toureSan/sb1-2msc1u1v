<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Service } from '@/types/service'
import { formatPrice } from '@/utils/format'
import Avatar from '@/components/ui/Avatar.vue'

const props = defineProps<{
  service: Service
}>()

const emit = defineEmits(['book'])
const router = useRouter()
const authStore = useAuthStore()

const handleBooking = () => {
  if (!authStore.isAuthenticated) {
    router.push({
      path: '/register',
      query: { 
        redirect: router.currentRoute.value.fullPath,
        service: props.service.id,
        role: 'client'
      }
    })
    return
  }
  emit('book', props.service)
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center space-x-4">
      <!-- Avatar -->
      <Avatar
        :src="service.provider.profile_picture_url"
        :alt="service.provider.name"
        size="lg"
        class="w-16 h-16"
      />

      <!-- Informations principales -->
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-gray-900">{{ service.title }}</h3>
        <p class="text-gray-600">{{ service.provider.name }}</p>
      </div>

      <!-- Prix et bouton -->
      <div class="text-right">
        <p class="text-2xl font-bold text-black">{{ formatPrice(service.price) }}</p>
        <button
          @click="handleBooking"
          class="mt-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Réserver
        </button>
      </div>
    </div>
  </div>
</template>