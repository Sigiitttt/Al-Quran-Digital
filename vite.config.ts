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
      // PERBAIKAN: Menghilangkan potensi syntax error pada manifest
      manifest: {
        name: 'Al-Quran Digital',
        short_name: 'Quran App',
        description: 'Aplikasi Al-Quran Digital yang ringan dan modern.',
        theme_color: '#010409',
        background_color: '#010409',
        start_url: '.',
        display: 'standalone',
        icons: [
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
  // Pastikan blok server ini ada dan benar
  server: {
    proxy: {
      '/api-doa': {
        target: 'https://doa-doa-api-ahmadramadhan.fly.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-doa/, ''),
      },
      // Aturan proxy untuk Kisah Nabi
      '/api-kisah': {
        target: 'https://kisah-nabi-api.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-kisah/, ''),
      }
    }
  }
})