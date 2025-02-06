<script setup lang="ts">
import { computed } from 'vue'
import { formatPrice } from '@/utils/format'
import { formatDate, formatTime } from '@/utils/date'
import Avatar from '@/components/ui/Avatar.vue'

const props = defineProps<{
  service: {
    title: string
    price: number
    provider: {
      id: string
      name: string
      profile_picture_url?: string
    }
  }
  dateTime: string
  duration: number
  location: string
  specialRequests: string
}>()

const totalPrice = computed(() => props.service.price * props.duration)
</script>

<template>
  <div class="space-y-6">
    <!-- Service Summary -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <div class="flex items-start space-x-4">
        <Avatar
          :src="service.provider.profile_picture_url"
          :alt="service.provider.name"
          size="lg"
        />
        <div>
          <h3 class="text-lg font-medium text-gray-900">{{ service.title }}</h3>
          <p class="text-gray-600">avec {{ service.provider.name }}</p>
        </div>
      </div>
    </div>

    <!-- Booking Details -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-4">Détails de la réservation</h4>
      
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">Date et heure</span>
          <span class="font-medium">{{ formatDate(dateTime) }} à {{ formatTime(dateTime) }}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-600">Durée</span>
          <span class="font-medium">{{ duration }}h</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-600">Adresse</span>
          <span class="font-medium">{{ location }}</span>
        </div>

        <div v-if="specialRequests" class="flex justify-between">
          <span class="text-gray-600">Demandes spéciales</span>
          <span class="font-medium">{{ specialRequests }}</span>
        </div>
        
        <div class="flex justify-between pt-4 border-t">
          <span class="text-gray-900 font-medium">Total</span>
          <span class="text-lg font-semibold text-indigo-600">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>