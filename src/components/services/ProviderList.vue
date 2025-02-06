<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProvidersStore } from '@/stores/providers'
import ProviderCard from './ProviderCard.vue'

const providersStore = useProvidersStore()
const { providers } = storeToRefs(providersStore)

const sortedProviders = computed(() => {
  return [...providers.value].sort((a, b) => b.rating - a.rating)
})

const emit = defineEmits(['book-service'])
</script>

<template>
  <div class="divide-y divide-gray-200">
    <ProviderCard
      v-for="provider in sortedProviders"
      :key="provider.id"
      :provider="provider"
      @book="$emit('book-service', $event)"
    />
  </div>
</template>