import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.tsx'
import 'virtual:uno.css'

createApp(App).use(vaporInteropPlugin).mount('#app')
