<script setup lang="ts">
import { ref } from 'vue'
import { useNotification } from '@/composables/useNotification'
import Avatar from '@/components/ui/Avatar.vue'

const props = defineProps<{
  modelValue: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    profilePicture?: File | null
  }
}>()

const emit = defineEmits(['update:modelValue'])
const { addNotification } = useNotification()
const previewUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const errors = ref<Record<string, string>>({})

const validateField = (field: string, value: string) => {
  errors.value[field] = ''

  switch (field) {
    case 'firstName':
    case 'lastName':
      if (!value.trim()) {
        errors.value[field] = 'Ce champ est requis'
      } else if (value.length < 2) {
        errors.value[field] = 'Doit contenir au moins 2 caractères'
      } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
        errors.value[field] = 'Ne doit contenir que des lettres'
      }
      break

    case 'email':
      if (!value.trim()) {
        errors.value.email = 'L\'email est requis'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.value.email = 'Email invalide'
      }
      break

    case 'phone':
      if (!value.trim()) {
        errors.value.phone = 'Le téléphone est requis'
      } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value)) {
        errors.value.phone = 'Numéro de téléphone invalide'
      }
      break

    case 'address':
      if (!value.trim()) {
        errors.value.address = 'L\'adresse est requise'
      } else if (value.length < 10) {
        errors.value.address = 'Adresse trop courte'
      }
      break
  }

  return !errors.value[field]
}

const updateField = (field: string, value: any) => {
  validateField(field, value)
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    addNotification('error', 'Le fichier doit être une image')
    return
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    addNotification('error', 'L\'image ne doit pas dépasser 5MB')
    return
  }

  // Create preview URL
  previewUrl.value = URL.createObjectURL(file)
  
  // Update form data
  updateField('profilePicture', file)
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-medium text-gray-900">Informations Personnelles</h2>

    <!-- Photo de profil -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Photo de profil</label>
      <div class="mt-2 flex items-center space-x-4">
        <div v-if="previewUrl" class="relative">
          <img
            :src="previewUrl"
            alt="Prévisualisation"
            class="h-24 w-24 rounded-full object-cover"
          />
          <button
            @click="previewUrl = null; updateField('profilePicture', null)"
            class="absolute -top-2 -right-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
          >
            <span class="sr-only">Supprimer</span>
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
        <div v-else class="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
          <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6zm9 11a1 1 0 01-2 0v-2a3 3 0 00-3-3H8a3 3 0 00-3 3v2a1 1 0 11-2 0v-2a5 5 0 015-5h8a5 5 0 015 5v2z" />
          </svg>
        </div>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
          ref="fileInput"
        />
        <button
          type="button"
          @click="fileInput?.click()"
          class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {{ previewUrl ? 'Changer la photo' : 'Ajouter une photo' }}
        </button>
      </div>
      <p class="mt-1 text-sm text-gray-500">
        JPG, PNG ou GIF. Taille maximale 5MB.
      </p>
    </div>

    <!-- Prénom et Nom -->
    <div class="grid grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          type="text"
          :value="modelValue.firstName"
          @input="updateField('firstName', ($event.target as HTMLInputElement).value)"
          @blur="validateField('firstName', modelValue.firstName)"
          class="mt-1 block w-full rounded-md shadow-sm"
          :class="[
            errors.firstName 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          ]"
          required
        >
        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          :value="modelValue.lastName"
          @input="updateField('lastName', ($event.target as HTMLInputElement).value)"
          @blur="validateField('lastName', modelValue.lastName)"
          class="mt-1 block w-full rounded-md shadow-sm"
          :class="[
            errors.lastName 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          ]"
          required
        >
        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
      </div>
    </div>

    <!-- Email -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        :value="modelValue.email"
        @input="updateField('email', ($event.target as HTMLInputElement).value)"
        @blur="validateField('email', modelValue.email)"
        class="mt-1 block w-full rounded-md shadow-sm"
        :class="[
          errors.email 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        ]"
        required
      >
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
    </div>

    <!-- Téléphone -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Téléphone</label>
      <input
        type="tel"
        :value="modelValue.phone"
        @input="updateField('phone', ($event.target as HTMLInputElement).value)"
        @blur="validateField('phone', modelValue.phone)"
        class="mt-1 block w-full rounded-md shadow-sm"
        :class="[
          errors.phone 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        ]"
        placeholder="06 12 34 56 78"
        required
      >
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
    </div>

    <!-- Adresse -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Adresse</label>
      <textarea
        :value="modelValue.address"
        @input="updateField('address', ($event.target as HTMLTextAreaElement).value)"
        @blur="validateField('address', modelValue.address)"
        rows="3"
        class="mt-1 block w-full rounded-md shadow-sm"
        :class="[
          errors.address 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        ]"
        required
      />
      <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
    </div>
  </div>
</template>