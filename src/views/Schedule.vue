<script setup lang="ts">
import { ref } from 'vue'

interface Appointment {
  id: string
  service: string
  client: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed'
}

const appointments = ref<Appointment[]>([
  {
    id: '1',
    service: 'Home Care Assistance',
    client: 'John Doe',
    date: '2024-02-20',
    time: '09:00',
    status: 'confirmed'
  },
  {
    id: '2',
    service: 'Pet Walking Service',
    client: 'Jane Smith',
    date: '2024-02-20',
    time: '14:00',
    status: 'pending'
  }
])
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900">Schedule</h2>
      <p class="mt-1 text-sm text-gray-500">Manage your upcoming appointments</p>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="appointment in appointments" :key="appointment.id" class="p-4 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ appointment.service }}</p>
              <p class="text-sm text-gray-500">Client: {{ appointment.client }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-900">{{ appointment.date }}</p>
              <p class="text-sm text-gray-500">{{ appointment.time }}</p>
            </div>
            <span
              :class="{
                'bg-yellow-100 text-yellow-800': appointment.status === 'pending',
                'bg-green-100 text-green-800': appointment.status === 'confirmed',
                'bg-gray-100 text-gray-800': appointment.status === 'completed'
              }"
              class="px-2 py-1 text-xs rounded-full capitalize"
            >
              {{ appointment.status }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>