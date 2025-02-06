<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { CATEGORIES } from '@/utils/constants'

const searchQuery = ref('')
const selectedCategory = ref(CATEGORIES[0].id)

const emit = defineEmits(['search', 'category-change'])

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleCategoryChange = () => {
  emit('category-change', selectedCategory.value)
}
</script>

<template>
  <div class="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm">
    <!-- Search input -->
    <div class="flex-1 relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
      </div>
      <input
        v-model="searchQuery"
        type="text"
        @input="handleSearch"
        class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Rechercher un service..."
      >
    </div>

    <!-- Category select -->
    <select
      v-model="selectedCategory"
      @change="handleCategoryChange"
      class="block w-48 pl-3 pr-10 py-2.5 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg"
    >
      <option
        v-for="category in CATEGORIES"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>