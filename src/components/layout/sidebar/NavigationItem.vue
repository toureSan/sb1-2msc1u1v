<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  name: string
  icon: Component
  href: string
  current: boolean
}

const props = defineProps<Props>()

const itemClasses = computed(() => [
  props.current ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50',
  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
])

const iconClasses = computed(() => [
  props.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500',
  'mr-3 flex-shrink-0 h-6 w-6'
])
</script>

<template>
  <router-link :to="href" :class="itemClasses">
    <component :is="icon" :class="iconClasses" aria-hidden="true" />
    {{ name }}
  </router-link>
</template>