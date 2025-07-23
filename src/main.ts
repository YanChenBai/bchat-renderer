import { createVaporApp, vaporInteropPlugin } from 'vue'
import App from './App.tsx'
import 'virtual:uno.css'
import './assets/main.css'

createVaporApp(App).use(vaporInteropPlugin).mount('#app')
