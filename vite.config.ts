import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
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
    unocss(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
