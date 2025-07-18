import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsxVapor from 'vue-jsx-vapor/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsxVapor({
      macros: true,
      interop: true,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
