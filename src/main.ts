import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.tsx'

createApp(App)
  .use(vaporInteropPlugin)
  .mount('#app')
