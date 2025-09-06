import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    include: "**/*.{jsx,tsx}",
  })],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/app-[hash].js',
        assetFileNames: 'assets/app-[hash].[ext]'
      }
    }
  },
  server: {
    open: '/'
  }
})