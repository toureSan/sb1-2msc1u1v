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

fetch('https://drnyyxtshnzwgkabxtgr.supabase.co/rest/v1/user_waitlist', {
  method: 'POST',
  headers: {
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: 'test@example.com' }),
})
  .then(async response => {
    console.log('Status:', response.status);

    // Lis la réponse brute
    const text = await response.text();
    console.log('Raw Response:', text);

    if (text) {
      // Si le corps n'est pas vide, on parse en JSON
      const data = JSON.parse(text);
      console.log('Parsed JSON:', data);
    } else {
      // Si le corps est vide, pas de parsing nécessaire
      console.log('No content returned from server.');
    }
  })
  .catch(error => console.error('Fetch Error:', error));
