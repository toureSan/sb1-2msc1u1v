<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import type { Provider } from '@/types/provider'
import { useMap } from '@/composables/useMap'
import { useGeolocation } from '@/composables/useGeolocation'
import { calculateDistance } from '@/utils/distance'
import { MAP_CONFIG } from '@/utils/constants'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  providers: Provider[]
}>()

const { coordinates, error } = useGeolocation()
const { mapContainer, map, addMarkers, centerMap } = useMap()

watch([() => props.providers, coordinates], () => {
  if (!map.value) return

  // Center map on Meyrin by default
  centerMap(MAP_CONFIG.defaultCenter[0], MAP_CONFIG.defaultCenter[1])

  const markers = props.providers.map(provider => ({
    id: provider.id,
    lat: 46.2324, // Default position for Meyrin
    lng: 6.0683,
    popupContent: `
      <div class="p-3">
        <h3 class="font-semibold text-lg">${provider.firstName} ${provider.lastName}</h3>
        <p class="text-gray-600">${provider.service_description}</p>
        <p class="font-semibold">${provider.service_rate}€/h</p>
        ${coordinates.value ? `
          <p class="text-sm text-gray-500">Distance: ${calculateDistance(
            coordinates.value.lat,
            coordinates.value.lng,
            46.2324,
            6.0683
          ).toFixed(1)} km</p>
        ` : ''}
      </div>
    `
  }))

  // Add user location marker if available
  if (coordinates.value) {
    markers.push({
      id: 'user',
      lat: coordinates.value.lat,
      lng: coordinates.value.lng,
      popupContent: 'Votre position',
      isUserLocation: true
    })
  }

  addMarkers(markers)
}, { immediate: true })

onMounted(() => {
  if (mapContainer.value) {
    centerMap(MAP_CONFIG.defaultCenter[0], MAP_CONFIG.defaultCenter[1])
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <div v-if="error" class="absolute top-4 left-4 z-10 bg-red-100 text-red-700 px-4 py-2 rounded-md">
      {{ error }}
    </div>
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
</template>