<script setup lang="ts">
import { ref } from 'vue'
import ServiceMap from '@/components/map/ServiceMap.vue'
import type { Service } from '@/types/service'

const services = ref<Service[]>([
  {
    id: '1',
    title: 'Home Care Service',
    description: 'Professional home care services for elderly and disabled individuals',
    category: 'Home Care',
    price: 25,
    provider: {
      id: 'p1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.8
    },
    location: {
      lat: 48.8566,
      lng: 2.3522
    }
  }
])
</script>

<template>
  <div class="h-screen">
    <ServiceMap :services="services" class="h-full" />
  </div>
</template>