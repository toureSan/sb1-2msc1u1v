<script setup lang="ts">
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="space-y-8">
    <h3 class="text-2xl font-bold text-white">WIM</h3>
    <p class="text-sm leading-6 text-gray-300">
      WIM est une plateforme innovante tout-en-un qui transforme l'accès aux services du quotidien. Notre mission : répondre à des enjeux sociétaux majeurs en quelques clics.
    </p>
    <div class="space-y-4">
      <div class="flex items-center space-x-3">
        <MapPinIcon class="h-5 w-5 text-gray-400" />
        <span class="text-sm text-gray-300">RÉSIDENCE PASSY PLAZA, 53b rue de Passy 75016 PARIS</span>
      </div>
      <div class="flex items-center space-x-3">
        <PhoneIcon class="h-5 w-5 text-gray-400" />
        <span class="text-sm text-gray-300">+33757183421 / +33633748016</span>
      </div>
      <div class="flex items-center space-x-3">
        <EnvelopeIcon class="h-5 w-5 text-gray-400" />
        <span class="text-sm text-gray-300">contact@wim.fr</span>
      </div>
    </div>
  </div>
</template>