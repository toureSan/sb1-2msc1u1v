import { ref, computed } from 'vue'
import type { Service } from '@/types/service'
import { initialServices } from '@/data/services'

export function useServices() {
  const services = ref<Service[]>(initialServices)
  
  const sortedServices = computed(() => {
    return [...services.value].sort((a, b) => b.provider.rating - a.provider.rating)
  })

  const filterServices = (category: string) => {
    if (category === 'all') return services.value
    return services.value.filter(service => service.category === category)
  }

  return {
    services,
    sortedServices,
    filterServices
  }
}