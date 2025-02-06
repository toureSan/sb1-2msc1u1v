<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>
</template>