import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import 'tippy.js/dist/tippy.css'
import './styles/main.scss'
import 'uno.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

})
app.use(router)
app.mount('#app')
