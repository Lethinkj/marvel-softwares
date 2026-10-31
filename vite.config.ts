import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/preview/marvelslice': {
        target: 'https://marvelslice.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preview\/marvelslice/, ''),
        secure: true,
      },
      '/preview/lms': {
        target: 'https://lms.marvelslice.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preview\/lms/, ''),
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
