<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import Header from '@/components/layout/Header.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { addNotification } = useNotification()

const isLoading = ref(false)

const handleRegister = async (formData: any) => {
  try {
    isLoading.value = true
    
    if (route.query.service) {
      formData.role = 'client'
    }
    
    const result = await authStore.register(formData)
    
    addNotification('success', 'Inscription réussie')
    
    if (route.query.redirect && route.query.service) {
      router.push(route.query.redirect as string)
    } else {
      router.push('/login')
    }
  } catch (error) {
    console.error('Registration error:', error)
    addNotification('error', error instanceof Error ? error.message : 'Erreur lors de l\'inscription')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1 bg-gray-50">
      <div class="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Créer un compte</h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm 
              :is-loading="isLoading"
              :initial-role="route.query.role?.toString()"
              :disable-role-selection="!!route.query.service"
              @submit="handleRegister" 
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>