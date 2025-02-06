<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardSidebar from './DashboardSidebar.vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile sidebar -->
    <div
      v-show="sidebarOpen"
      class="relative z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-900/80"></div>
      <div class="fixed inset-0 flex">
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button
              type="button"
              class="-m-2.5 p-2.5"
              @click="sidebarOpen = false"
            >
              <XMarkIcon class="h-6 w-6 text-white" />
            </button>
          </div>
          <DashboardSidebar />
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <DashboardSidebar />
    </div>

    <div class="lg:pl-72">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <!-- Sidebar toggle -->
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Profile dropdown -->
            <button
              @click="handleLogout"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>