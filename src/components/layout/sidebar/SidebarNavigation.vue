<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { UserGroupIcon, CalendarIcon, ChatBubbleLeftIcon, CogIcon } from '@heroicons/vue/24/outline'
import NavigationItem from './NavigationItem.vue'

const route = useRoute()

const navigation = computed(() => [
  { name: 'Services', icon: UserGroupIcon, href: '/services', current: route.path === '/services' },
  { name: 'Schedule', icon: CalendarIcon, href: '/schedule', current: route.path === '/schedule' },
  { name: 'Messages', icon: ChatBubbleLeftIcon, href: '/messages', current: route.path === '/messages' },
  { name: 'Settings', icon: CogIcon, href: '/settings', current: route.path === '/settings' },
])
</script>

<template>
  <nav class="flex-1 px-2 space-y-1">
    <NavigationItem
      v-for="item in navigation"
      :key="item.name"
      v-bind="item"
    />
  </nav>
</template>