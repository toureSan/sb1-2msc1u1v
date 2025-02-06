<script setup lang="ts">
import { ref } from 'vue'
import StatCard from '../components/dashboard/StatCard.vue'

const stats = ref([
  { name: 'Active Services', value: '12' },
  { name: 'Pending Requests', value: '4' },
  { name: 'Total Earnings', value: '$2,450' },
  { name: 'Client Rating', value: '4.8/5' },
])
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900">Dashboard</h2>
      <p class="mt-1 text-sm text-gray-500">Overview of your services and activities</p>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        v-for="item in stats"
        :key="item.name"
        v-bind="item"
      />
    </div>
  </div>
</template>