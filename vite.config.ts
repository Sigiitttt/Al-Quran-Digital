// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Al-Quran Digital',
        short_name: 'Quran App',
        description: 'Aplikasi Al-Quran Digital yang ringan dan modern.',
        theme_color: '#010409',
        background_color: '#010409',
        start_url: '.',
        display: 'standalone',
        icons: [
          // ... (konfigurasi ikon Anda sudah benar)
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],

  // =================================================================
  // PERBAIKAN UTAMA DI SINI:
  // Tambahkan blok 'server.proxy' yang hilang di bawah ini.
  // =================================================================
  server: {
    proxy: {
      // Jika ada permintaan ke '/api-doa', teruskan ke target di bawah
      '/api-doa': {
        target: 'https://doa-doa-api-ahmadramadhan.fly.dev',
        changeOrigin: true,
        // Hapus '/api-doa' dari path sebelum dikirim ke target
        rewrite: (path) => path.replace(/^\/api-doa/, ''),
      }
    }
  }
})