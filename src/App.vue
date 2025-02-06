<script setup lang="ts">
import { ref } from 'vue'

const isDev = ref(process.env.NODE_ENV === 'development')
</script>

<template>
  <router-view></router-view>
</template>