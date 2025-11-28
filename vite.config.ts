import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/HYW-Meme-Web/',
  plugins: [
      vue(),
      tailwindcss(),
  ],
  build: {
    // Set chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Disable source maps for production
    sourcemap: false,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096
  }
})
