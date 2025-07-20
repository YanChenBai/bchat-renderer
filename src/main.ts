import { createVaporApp } from 'vue'
import App from './app.tsx'
import 'virtual:uno.css'
import './assets/main.css'

createVaporApp(App).mount('#app')
