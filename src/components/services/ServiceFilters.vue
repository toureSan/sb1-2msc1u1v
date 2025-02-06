<script setup lang="ts">
import { ref } from 'vue'

const categories = ref([
  'All Services',
  'Home Care',
  'Healthcare',
  'Pet Care',
  'Housekeeping',
  'Personal Care'
])

const selectedCategory = ref('All Services')
const priceRange = ref([0, 100])
const minRating = ref(0)

const emit = defineEmits(['filter'])

function applyFilters() {
  emit('filter', {
    category: selectedCategory.value,
    priceRange: priceRange.value,
    minRating: minRating.value
  })
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
    
    <div class="space-y-6">
      <!-- Categories -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select 
          v-model="selectedCategory"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Price Range -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}
        </label>
        <input 
          type="range" 
          v-model="priceRange[1]" 
          min="0" 
          max="200" 
          class="w-full"
        >
      </div>

      <!-- Minimum Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating: {{ minRating }}
        </label>
        <input 
          type="range" 
          v-model="minRating" 
          min="0" 
          max="5" 
          step="0.5" 
          class="w-full"
        >
      </div>

      <button
        @click="applyFilters"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  </div>
</template>