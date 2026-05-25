import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    visualizer({ filename: 'stats.html', gzipSize: true, open: false }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Praxis',
        short_name: 'Praxis',
        description: 'Personal frontend engineering portfolio',
        theme_color: '#0a0a0b',
        background_color: '#0a0a0b',
        display: 'standalone',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        },
      },
    },
  },
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})