import L from 'leaflet'
import type { Map } from 'leaflet'

export function initializeMap(container: HTMLElement): Map {
  const map = L.map(container).setView([48.8566, 2.3522], 13)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  
  return map
}