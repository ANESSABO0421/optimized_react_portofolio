import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import tailwindcss from '@tailwindcss/vite' // ✅ Keep this import (Vite plugin form, not Babel)

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'], // ✅ Only Babel plugins here
      },
    }),
    tailwindcss(), // ✅ Tailwind plugin goes here (as a Vite plugin)
    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false },
    }),
  ].filter(Boolean),

  build: {
    sourcemap: mode !== 'production',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion', 'gsap', 'lottie-react'],
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  preview: {
    port: 4173,
  },

  css: {
    devSourcemap: true,
  },
}))
