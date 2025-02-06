<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@/composables/useForm'

const props = defineProps<{
  isLoading?: boolean
}>()

const emit = defineEmits(['submit'])

const { formData, errors, validateField } = useForm({
  email: '',
  password: ''
})

const validateForm = () => {
  validateField('email', 
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Email invalide'
  )

  validateField('password',
    (value) => value.length >= 8,
    'Le mot de passe doit contenir au moins 8 caractères'
  )

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  if (!validateForm()) return
  
  try {
    emit('submit', {
      email: formData.value.email,
      password: formData.value.password
    })
  } catch (error) {
    console.error('Form submission error:', error)
  }
}
</script>

<template>
  <form class="space-y-6" @submit="handleSubmit">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        :disabled="isLoading"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{'border-red-500': errors.email}"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
        :disabled="isLoading"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{'border-red-500': errors.password}"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      <span v-if="isLoading">Connexion en cours...</span>
      <span v-else>Se connecter</span>
    </button>

    <div class="text-sm text-center">
      <router-link to="/register" class="text-indigo-600 hover:text-indigo-500">
        Pas encore de compte ? S'inscrire
      </router-link>
    </div>
  </form>
</template>