```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@/composables/useForm'

const props = defineProps<{
  isLoading?: boolean
}>()

const emit = defineEmits(['submit'])

const { formData, errors, validateField } = useForm({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: ''
})

const validateForm = () => {
  let isValid = true

  // Email validation
  validateField('email', 
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Email invalide'
  )

  // Password validation
  validateField('password',
    (value) => value.length >= 8,
    'Le mot de passe doit contenir au moins 8 caractères'
  )

  // Confirm password validation
  validateField('confirmPassword',
    (value) => value === formData.value.password,
    'Les mots de passe ne correspondent pas'
  )

  // Name validation
  validateField('firstName',
    (value) => value.length > 0,
    'Le prénom est requis'
  )
  validateField('lastName',
    (value) => value.length > 0,
    'Le nom est requis'
  )

  return Object.keys(errors.value).length === 0
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!validateForm()) return
  emit('submit', {
    ...formData.value,
    role: 'client'
  })
}
</script>

<template>
  <form class="space-y-6" @submit="handleSubmit">
    <!-- Form fields remain the same -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          id="firstName"
          v-model="formData.firstName"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          :class="{'border-red-500': errors.firstName}"
        />
        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
      </div>

      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
        <input
          id="lastName"
          v-model="formData.lastName"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          :class="{'border-red-500': errors.lastName}"
        />
        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
      </div>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
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
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{'border-red-500': errors.password}"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
    </div>

    <div>
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
      <input
        id="confirmPassword"
        v-model="formData.confirmPassword"
        type="password"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{'border-red-500': errors.confirmPassword}"
      />
      <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {{ isLoading ? 'Inscription...' : 'S\'inscrire' }}
    </button>

    <div class="text-sm text-center">
      <router-link to="/login" class="text-indigo-600 hover:text-indigo-500">
        Déjà un compte ? Se connecter
      </router-link>
    </div>
  </form>
</template>
```