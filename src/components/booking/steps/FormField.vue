<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <slot />
  </div>
</template>