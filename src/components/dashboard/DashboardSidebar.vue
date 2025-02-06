<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const authStore = useAuthStore()

const navigation = computed(() => {
  const baseNavigation = [
    { name: 'Tableau de bord', href: authStore.isProvider ? '/dashboard/provider' : '/dashboard/client', icon: HomeIcon },
    { name: 'Réservations', href: '/dashboard/bookings', icon: CalendarIcon },
    { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  ]

  if (authStore.isProvider) {
    baseNavigation.push(
      { name: 'Mes Services', href: '/dashboard/services', icon: ClipboardDocumentListIcon },
      { name: 'Clients', href: '/dashboard/clients', icon: UserGroupIcon }
    )
  }

  baseNavigation.push({ name: 'Paramètres', href: '/dashboard/settings', icon: Cog6ToothIcon })

  return baseNavigation
})

const isActive = (href: string) => route.path === href
</script>

<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
    <div class="flex h-16 shrink-0 items-center">
      <router-link to="/" class="text-xl font-bold text-indigo-600">
        ServiceLink
      </router-link>
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.href"
                :class="[
                  isActive(item.href)
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    isActive(item.href) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                    'h-6 w-6 shrink-0'
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="mt-auto">
          <div class="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
            <div class="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
              <span class="text-xs font-medium text-gray-500">
                {{ authStore.user?.firstName?.[0] }}{{ authStore.user?.lastName?.[0] }}
              </span>
            </div>
            <span class="sr-only">Votre profil</span>
            <span aria-hidden="true">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>