<script setup lang="ts">
import { ref } from 'vue'

interface Service {
  id: string
  title: string
  category: string
  price: number
  description: string
  provider: {
    name: string
    rating: number
  }
}

const services = ref<Service[]>([
  {
    id: '1',
    title: 'Home Care Assistance',
    category: 'Healthcare',
    price: 25,
    description: 'Professional home care services for elderly and disabled individuals',
    provider: {
      name: 'Sarah Johnson',
      rating: 4.8
    }
  },
  {
    id: '2',
    title: 'Pet Walking Service',
    category: 'Pet Care',
    price: 15,
    description: 'Daily dog walking and pet sitting services',
    provider: {
      name: 'Mike Wilson',
      rating: 4.9
    }
  }
])
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900">Available Services</h2>
      <p class="mt-1 text-sm text-gray-500">Browse and book services from our verified providers</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="service in services" :key="service.id" class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900">{{ service.title }}</h3>
            <p class="text-sm text-gray-500">{{ service.category }}</p>
          </div>
          <span class="text-lg font-semibold text-indigo-600">${{ service.price }}/hr</span>
        </div>
        <p class="mt-4 text-gray-600">{{ service.description }}</p>
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-sm text-gray-600">{{ service.provider.name }}</span>
            <span class="ml-2 text-sm text-yellow-500">★ {{ service.provider.rating }}</span>
          </div>
          <button class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>