<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import DashboardLayout from '@/components/dashboard/DashboardLayout.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import BookingList from '@/components/dashboard/BookingList.vue'
import Header from '@/components/layout/Header.vue'

const bookingsStore = useBookingsStore()
const providerId = 'current-provider'

const stats = ref([
  { name: 'Demandes Reçues', value: '0' },
  { name: 'Services en Cours', value: '0' },
  { name: 'Services Complétés', value: '0' },
  { name: 'Revenus Totaux', value: '0€' }
])

onMounted(() => {
  const providerBookings = bookingsStore.getBookingsByProvider(providerId)
  stats.value = [
    {
      name: 'Demandes Reçues',
      value: providerBookings.length.toString()
    },
    {
      name: 'Services en Cours',
      value: providerBookings.filter(b => b.status === 'accepted').length.toString()
    },
    {
      name: 'Services Complétés',
      value: providerBookings.filter(b => b.status === 'completed').length.toString()
    },
    {
      name: 'Revenus Totaux',
      value: `${providerBookings.reduce((acc, b) => acc + b.totalPrice, 0)}€`
    }
  ]
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1">
      <DashboardLayout>
        <div class="space-y-6">
          <h1 class="text-2xl font-bold text-gray-900">Tableau de Bord Prestataire</h1>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              v-for="item in stats"
              :key="item.name"
              v-bind="item"
            />
          </div>

          <BookingList :user-id="providerId" :is-provider="true" />
        </div>
      </DashboardLayout>
    </main>
  </div>
</template>