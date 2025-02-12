import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import './style.css'
import App from './App.vue'
import { supabase } from '@/lib/supabase'  // Utilise l'instance unique

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialisation de l'authentification
const authStore = useAuthStore()
authStore.initAuth().finally(() => {
  app.mount('#app')
})
