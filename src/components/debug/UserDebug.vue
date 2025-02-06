<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-50">
    <h3 class="font-bold mb-2">État de l'authentification</h3>
    <pre class="text-xs whitespace-pre-wrap">
      Connecté: {{ authStore.isAuthenticated }}
      Rôle: {{ authStore.user?.role }}
      ID: {{ authStore.user?.id }}
      Email: {{ authStore.user?.email }}
      Nom: {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
    </pre>
  </div>
</template>