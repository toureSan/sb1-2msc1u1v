<script setup lang="ts">
import { computed } from 'vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
}

const imageUrl = computed(() => {
  if (!props.src) return null
  if (props.src.startsWith('https')) return props.src
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${props.src}`
})
</script>

<template>
  <div 
    class="relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center"
    :class="sizeClasses[size || 'md']"
  >
    <template v-if="imageUrl">
      <img
        :src="imageUrl"
        :alt="alt"
        class="absolute inset-0 w-full h-full object-cover"
        @error="$event.target.style.display = 'none'"
      />
    </template>
    <UserCircleIcon
      v-else
      class="h-full w-full text-gray-400"
    />
  </div>
</template>