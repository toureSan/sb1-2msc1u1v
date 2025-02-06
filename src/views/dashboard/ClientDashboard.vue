<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import DashboardLayout from '@/components/dashboard/DashboardLayout.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import BookingList from '@/components/dashboard/BookingList.vue'
import Header from '@/components/layout/Header.vue'

const bookingsStore = useBookingsStore()
const userId = 'current-user'

const stats = ref([
  { name: 'Services Réservés', value: '0' },
  { name: 'En Attente', value: '0' },
  { name: 'Complétés', value: '0' },
  { name: 'Dépenses Totales', value: '0€' }
])

onMounted(() => {
  const userBookings = bookingsStore.getBookingsByUser(userId)
  stats.value = [
    { 
      name: 'Services Réservés', 
      value: userBookings.length.toString() 
    },
    {
      name: 'En Attente',
      value: userBookings.filter(b => b.status === 'pending').length.toString()
    },
    {
      name: 'Complétés',
      value: userBookings.filter(b => b.status === 'completed').length.toString()
    },
    {
      name: 'Dépenses Totales',
      value: `${userBookings.reduce((acc, b) => acc + b.totalPrice, 0)}€`
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
          <h1 class="text-2xl font-bold text-gray-900">Tableau de Bord Client</h1>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              v-for="item in stats"
              :key="item.name"
              v-bind="item"
            />
          </div>

          <BookingList :user-id="userId" :is-provider="false" />
        </div>
      </DashboardLayout>
    </main>
  </div>
</template>