import L from 'leaflet'
import type { Map, MapOptions } from 'leaflet'
import { MAP_CONFIG } from './constants'

export const initializeMap = (container: HTMLElement, options: MapOptions = {}): Map => {
  const defaultOptions: MapOptions = {
    center: MAP_CONFIG.defaultCenter,
    zoom: MAP_CONFIG.defaultZoom,
    ...options
  }

  const map = L.map(container, defaultOptions)
  
  L.tileLayer(MAP_CONFIG.tileLayer.url, {
    attribution: MAP_CONFIG.tileLayer.attribution
  }).addTo(map)
  
  return map
}

export const createMarker = (lat: number, lng: number, popupContent: string) => {
  return L.marker([lat, lng]).bindPopup(popupContent)
}