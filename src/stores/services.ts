import { defineStore } from 'pinia'
import { ref } from 'vue'
import { serviceService } from '@/services/service.service'
import type { Service } from '@/types/service'

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadServices() {
    try {
      isLoading.value = true
      error.value = null
      services.value = await serviceService.getServices()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function createService(serviceData: Partial<Service>) {
    try {
      isLoading.value = true
      error.value = null
      const newService = await serviceService.createService(serviceData)
      services.value.unshift(newService)
      return newService
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateService(id: string, serviceData: Partial<Service>) {
    try {
      isLoading.value = true
      error.value = null
      const updatedService = await serviceService.updateService(id, serviceData)
      const index = services.value.findIndex(s => s.id === id)
      if (index !== -1) {
        services.value[index] = updatedService
      }
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    services,
    isLoading,
    error,
    loadServices,
    createService,
    updateService
  }
})