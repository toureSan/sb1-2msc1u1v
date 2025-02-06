<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid'
import { formatPrice } from '@/utils/format'
import type { Provider } from '@/types/provider'
import Avatar from '@/components/ui/Avatar.vue'

const props = defineProps<{
  provider: Provider
}>()

const emit = defineEmits(['book'])

const handleBook = () => {
  emit('book', {
    id: props.provider.id,
    title: props.provider.services[0] || 'Service',
    description: props.provider.service_description || '',
    price: props.provider.service_rate || 0,
    provider: {
      id: props.provider.id,
      name: `${props.provider.firstName} ${props.provider.lastName}`,
      profile_picture_url: props.provider.profile_picture_url,
      rating: props.provider.rating
    }
  })
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
    <div class="flex items-start space-x-6">
      <!-- Avatar with colored circle -->
      <div class="relative">
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-50"></div>
        <Avatar
          :src="provider.profile_picture_url"
          :alt="`${provider.firstName} ${provider.lastName}`"
          size="lg"
          class="relative z-10"
        />
      </div>

      <!-- Main information -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ provider.firstName }} {{ provider.lastName }}
            </h3>
            <div class="flex items-center mt-1 space-x-2">
              <div class="flex items-center">
                <StarIcon class="h-5 w-5 text-yellow-400" />
                <span class="ml-1 text-gray-600 font-medium">{{ provider.rating }}</span>
              </div>
              <span class="text-gray-400">•</span>
              <span class="text-gray-600">{{ provider.service_description || 'Service professionnel' }}</span>
            </div>
          </div>
          
          <div class="text-right">
            <p class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              {{ formatPrice(provider.service_rate || 0) }}
            </p>
            <button
              @click="handleBook"
              class="mt-3 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-medium text-sm"
            >
              Réserver
            </button>
          </div>
        </div>

        <!-- Service tags -->
        <div class="mt-4 flex flex-wrap gap-2">
          <span 
            v-for="service in provider.services" 
            :key="service"
            class="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-100"
          >
            {{ service }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>