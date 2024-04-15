import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import { VitePWA as PWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router': ['useRoute', 'useRouter'],
          '@vueuse/core': [],
        },
      ],
      dirs: ['src/composables'],
      dts: 'src/shims/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/shims/components.d.ts',
    }),
    Pages(),
    PWA({
      strategies: 'injectManifest',
      injectRegister: null,
      injectManifest: {
        rollupFormat: 'iife',
      },
      manifest: false,
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'sw.ts',
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
