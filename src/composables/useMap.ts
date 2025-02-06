import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import type { Map, Marker } from 'leaflet'
import { MAP_CONFIG } from '@/utils/constants'

interface MarkerData {
  id: string
  lat: number
  lng: number
  popupContent: string
  isUserLocation?: boolean
}

export function useMap() {
  const mapContainer = ref<HTMLElement | null>(null)
  const map = ref<Map | null>(null)
  const markers = ref<Record<string, Marker>>({})

  const initializeMap = (container: HTMLElement) => {
    map.value = L.map(container).setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom)
    
    L.tileLayer(MAP_CONFIG.tileLayer.url, {
      attribution: MAP_CONFIG.tileLayer.attribution
    }).addTo(map.value)
  }

  const centerMap = (lat: number, lng: number) => {
    if (map.value) {
      map.value.setView([lat, lng], MAP_CONFIG.defaultZoom)
    }
  }

  const addMarkers = (markersData: MarkerData[]) => {
    if (!map.value) return

    // Supprimer les marqueurs existants
    Object.values(markers.value).forEach(marker => marker.remove())
    markers.value = {}

    // Ajouter les nouveaux marqueurs
    markersData.forEach(data => {
      const icon = data.isUserLocation ? 
        L.divIcon({
          html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>',
          className: 'custom-div-icon'
        }) :
        L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })

      const marker = L.marker([data.lat, data.lng], { icon })
        .bindPopup(data.popupContent)
        .addTo(map.value!)
      
      markers.value[data.id] = marker
    })
  }

  const focusMarker = (markerId: string) => {
    const marker = markers.value[markerId]
    if (marker && map.value) {
      map.value.setView(marker.getLatLng(), MAP_CONFIG.defaultZoom)
      marker.openPopup()
    }
  }

  onMounted(() => {
    if (mapContainer.value) {
      initializeMap(mapContainer.value)
    }
  })

  onUnmounted(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
  })

  return {
    mapContainer,
    map,
    markers,
    addMarkers,
    centerMap,
    focusMarker
  }
}