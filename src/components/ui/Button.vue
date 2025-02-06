<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors"
    :class="{
      'bg-black text-white hover:bg-gray-800': variant === 'primary',
      'bg-white text-black border border-gray-300 hover:bg-gray-50': variant === 'secondary',
      'border-2 border-black text-black hover:bg-black hover:text-white': variant === 'outline',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg'
    }"
  >
    <slot />
  </button>
</template>