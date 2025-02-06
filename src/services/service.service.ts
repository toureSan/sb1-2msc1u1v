import type { Service } from '@/types/service'
import { initialServices } from '@/data/services'

export const serviceService = {
  async getServices() {
    try {
      return initialServices
    } catch (error) {
      throw error
    }
  },

  async createService(serviceData: Partial<Service>) {
    try {
      const newService = {
        id: `service-${Date.now()}`,
        ...serviceData
      }
      initialServices.push(newService as Service)
      return newService
    } catch (error) {
      throw error
    }
  },

  async updateService(id: string, serviceData: Partial<Service>) {
    try {
      const index = initialServices.findIndex(s => s.id === id)
      if (index !== -1) {
        initialServices[index] = { ...initialServices[index], ...serviceData }
        return initialServices[index]
      }
      throw new Error('Service not found')
    } catch (error) {
      throw error
    }
  }
}