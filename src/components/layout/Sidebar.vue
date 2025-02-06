<script setup lang="ts">
import SidebarHeader from './sidebar/SidebarHeader.vue'
import SidebarNavigation from './sidebar/SidebarNavigation.vue'
</script>

<template>
  <div class="flex flex-col h-full bg-white border-r border-gray-200 w-64">
    <SidebarHeader />
    <SidebarNavigation />
  </div>
</template>