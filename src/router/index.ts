import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LandingPage from '@/views/LandingPage.vue'
import ServiceExplorer from '@/views/ServiceExplorer.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import ProviderRegistration from '@/views/provider/ProviderRegistration.vue'
import ClientDashboard from '@/views/dashboard/ClientDashboard.vue'
import ProviderDashboard from '@/views/dashboard/ProviderDashboard.vue'
import AboutPage from '@/views/AboutPage.vue'
import PricingPage from '@/views/PricingPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/explore',
      name: 'explore',
      component: ServiceExplorer
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/provider',
      name: 'provider-registration',
      component: ProviderRegistration
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingPage
    },
    {
      path: '/dashboard/client',
      name: 'client-dashboard',
      component: ClientDashboard,
      meta: { requiresAuth: true, role: 'client' }
    },
    {
      path: '/dashboard/provider',
      name: 'provider-dashboard',
      component: ProviderDashboard,
      meta: { requiresAuth: true, role: 'provider' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router