<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import Header from '@/components/layout/Header.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { addNotification } = useNotification()

const isLoading = ref(false)

const handleLogin = async (formData: { email: string; password: string }) => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    await authStore.login(formData)
    
    addNotification('success', 'Connexion réussie')
    
    const redirectPath = route.query.redirect as string
    router.push(redirectPath || (authStore.isProvider ? '/dashboard/provider' : '/dashboard/client'))
  } catch (error) {
    console.error('Login error:', error)
    addNotification('error', 'Email ou mot de passe incorrect')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1 bg-gray-50">
      <AuthLayout title="Connexion">
        <LoginForm 
          :is-loading="isLoading"
          @submit="handleLogin"
        />
      </AuthLayout>
    </main>
  </div>
</template>