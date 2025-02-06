<script setup lang="ts">
import { ref } from 'vue'
import type { Service } from '@/types/service'
import ServiceCard from './ServiceCard.vue'
import BookingModal from '@/components/booking/BookingModal.vue'

defineProps<{
  services: Service[]
}>()

const selectedService = ref<Service | null>(null)
const isBookingModalOpen = ref(false)

const handleServiceSelect = (service: Service) => {
  selectedService.value = service
}

const handleBookService = (service: Service) => {
  selectedService.value = service
  isBookingModalOpen.value = true
}
</script>

<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-semibold text-gray-900">Services disponibles</h2>
    <div class="space-y-4">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
        @select="handleServiceSelect"
        @book="handleBookService"
      />
    </div>

    <!-- Modal de réservation -->
    <BookingModal
      v-if="isBookingModalOpen"
      :service="selectedService"
      :is-open="isBookingModalOpen"
      @close="isBookingModalOpen = false"
    />
  </div>
</template>