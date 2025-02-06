<script setup lang="ts">
import { ref } from 'vue'
import ServiceCard from '@/components/services/ServiceCard.vue'
import type { Service } from '@/types/service'

const featuredServices = ref<Service[]>([
  {
    id: '1',
    title: 'Senior Care Specialist',
    description: 'Professional elderly care with medical background',
    category: 'Healthcare',
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
  },
  {
    id: '2',
    title: 'Home Cleaning Pro',
    description: 'Detailed home cleaning services',
    category: 'Cleaning',
    price: 22,
    provider: {
      id: 'p2',
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9
    },
    location: {
      lat: 48.8606,
      lng: 2.3376
    }
  }
])
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Featured Services</h2>
        <p class="mt-4 text-xl text-gray-600">Discover our most popular service providers</p>
      </div>
      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <ServiceCard
          v-for="service in featuredServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </section>
</template>