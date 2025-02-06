import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import { initSupabase } from '@/lib/supabase'
import './style.css'
import App from './App.vue'

// Initialize Supabase before creating the app
const supabase = initSupabase()
if (!supabase) {
  console.error('Failed to initialize Supabase')
}

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
authStore.initAuth().finally(() => {
  app.mount('#app')
})