import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsxVapor from 'vue-jsx-vapor/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsxVapor({
      macros: true,
      // interop: true,
    }),
    unocss(),
    vueDevTools(),
    autoImport({
      imports: [
        'vue',
        {
          'vue-jsx-vapor': [
            'useRef',
            'useFullProps',
            'useProps',
            'defineStyle',
          ],
        },
      ],
      dirs: ['./src/hooks'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
})
