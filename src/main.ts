import type { VaporComponent } from 'vue'
import { createVaporApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './assets/main.css'
import '@unocss/reset/tailwind-compat.css'

createVaporApp(App as VaporComponent).mount('#app')
