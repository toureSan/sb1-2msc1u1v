<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import Avatar from '@/components/ui/Avatar.vue'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'À propos', href: '/about' },
  { name: 'Nos abonnements', href: '/pricing' },
  { name: 'Devenir prestataire', href: '/provider' }
]

const userFullName = computed(() => {
  if (!authStore.user?.firstName && !authStore.user?.lastName) return ''
  return `${authStore.user.firstName} ${authStore.user.lastName}`
})

const handleLogin = () => {
  router.push('/explore')
}

const handleSignup = () => {
  router.push('/explore')
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

const handleDashboard = () => {
  const route = authStore.isProvider ? '/dashboard/provider' : '/dashboard/client'
  router.push(route)
}
</script>

<template>
  <header class="fixed w-full bg-white shadow-sm z-50">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <!-- Logo -->
      <div class="flex lg:flex-1">
        <router-link to="/" class="-m-1.5 p-1.5">
          <span class="text-xl font-bold text-black">WIM</span>
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Navigation principale -->
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900 hover:text-black transition-colors"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Actions d'authentification -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
        <template v-if="authStore.isAuthenticated">
          <div class="flex items-center space-x-4">
            <Avatar
              class="cursor-pointer"
              :src="authStore.user?.profile_picture_url"
              :alt="userFullName"
              size="sm"
              @click="handleDashboard"
            />
            <button
              @click="handleLogout"
              class="text-sm font-semibold leading-6 text-gray-900 hover:text-black transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </template>
        <template v-else>
          <button
            @click="handleLogin"
            class="text-sm font-semibold leading-6 text-gray-900 hover:text-black transition-colors"
          >
            Connexion
          </button>
          <button
            @click="handleSignup"
            class="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            S'inscrire
          </button>
        </template>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <router-link to="/" class="-m-1.5 p-1.5">
            <span class="text-xl font-bold text-black">WIM</span>
          </router-link>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
              >
                {{ item.name }}
              </router-link>
            </div>
            <div class="py-6">
              <template v-if="authStore.isAuthenticated">
                <div class="flex items-center space-x-4 mb-4">
                  <Avatar
                    :src="authStore.user?.profile_picture_url"
                    :alt="userFullName"
                    size="sm"
                  />
                </div>
                <button
                  @click="handleDashboard"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Tableau de bord
                </button>
                <button
                  @click="handleLogout"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </template>
              <template v-else>
                <button
                  @click="handleLogin"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Connexion
                </button>
                <button
                  @click="handleSignup"
                  class="mt-2 w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                >
                  S'inscrire
                </button>
              </template>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>