<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-1 flex items-center justify-center px-4 pb-16">
      <div class="max-w-3xl w-full text-center">
        <div v-if="$route.query.subscribed">
          <!-- Success message -->
          <div class="bg-white p-8 rounded-xl shadow-sm">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="mt-4 text-2xl font-semibold text-gray-900">
              Merci de votre inscription !
            </h2>
            <p class="mt-2 text-gray-600">
              Nous vous contacterons dès que notre service sera disponible dans votre région.
              En attendant, n'hésitez pas à explorer le reste de notre plateforme.
            </p>
            <button
              @click="router.push('/')"
              class="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>

        <div v-else>
          <!-- Pre-launch content -->
          <h1 class="mt-24 text-4xl font-bold text-gray-900 sm:text-5xl">
            Bientôt disponible
          </h1>
          <p class="mt-4 text-xl text-gray-600">
            Notre plateforme de recherche de services est en cours de développement. Soyez parmi les premiers à être informés de son lancement !
          </p>

          <div class="mt-12 bg-white p-8 rounded-xl shadow-sm">
            <h2 class="text-2xl font-semibold text-gray-900">
              Rejoignez la liste d'attente
            </h2>
            <p class="mt-2 text-gray-600">
              Recevez une notification dès que notre service sera disponible dans votre région.
            </p>

            <form @submit.prevent="handleSubmit" class="mt-6">
              <div class="max-w-md mx-auto">
                <label for="email" class="sr-only">Adresse email</label>
                <div class="flex gap-4">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    :disabled="isSubmitting"
                  >
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="flex-none rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-50"
                  >
                    {{ isSubmitting ? 'En cours...' : 'S\'inscrire' }}
                  </button>
                </div>
              </div>
            </form>

            <!-- Section prestataire -->
            <div class="mt-8 border-t pt-8">
              <h3 class="text-lg font-semibold text-gray-900">
                Vous souhaitez rejoindre la team WIM ?
              </h3>
              <p class="mt-2 text-gray-600">
                Rejoignez la plateforme et commencez à aider dès maintenant.
              </p>
              <button
                @click="router.push('/provider')"
                class="mt-4 inline-flex items-center px-6 py-3 border border-black rounded-lg text-black hover:bg-black hover:text-white transition-colors"
              >
                Devenir prestataire
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'
import { supabase } from '@/lib/supabase'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const router = useRouter()
const email = ref('')
const isSubmitting = ref(false)
const { addNotification } = useNotification()

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  if (!validateEmail(email.value)) {
    addNotification('error', 'Veuillez entrer une adresse email valide')
    return
  }

  try {
    isSubmitting.value = true

    const { error } = await supabase
      .from('user_waitlist')
      .insert([{ email: email.value }])

    if (error) {
      if (error.code === '23505') {
        addNotification('error', 'Cette adresse email est déjà inscrite')
        return
      }
      throw error
    }

    addNotification('success', 'Merci de votre inscription ! Nous vous contacterons bientôt.')
    
    router.push({
      path: '/explore',
      query: { subscribed: 'true' }
    })
  } catch (error) {
    console.error('Subscription error:', error)
    addNotification('error', 'Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>