import { ref, onMounted } from 'vue'

export function useGeolocation() {
  const coordinates = ref<{ lat: number; lng: number } | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const getLocation = () => {
    if (!navigator.geolocation) {
      error.value = "La géolocalisation n'est pas supportée par votre navigateur"
      return
    }

    isLoading.value = true
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        isLoading.value = false
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            error.value = "Vous avez refusé l'accès à votre position"
            break
          case err.POSITION_UNAVAILABLE:
            error.value = "La position n'est pas disponible"
            break
          case err.TIMEOUT:
            error.value = "La demande de position a expiré"
            break
          default:
            error.value = "Une erreur inconnue est survenue"
        }
        isLoading.value = false
      }
    )
  }

  onMounted(() => {
    getLocation()
  })

  return {
    coordinates,
    error,
    isLoading,
    getLocation
  }
}