<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <div class="absolute top-4 left-4">
      <router-link 
        to="/" 
        class="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon class="h-5 w-5 mr-1" />
        Retour à l'accueil
      </router-link>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-center text-3xl font-bold text-indigo-600">ServiceLink</h1>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">{{ title }}</h2>
      <p v-if="subtitle" class="mt-2 text-center text-sm text-gray-600">
        {{ subtitle }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>