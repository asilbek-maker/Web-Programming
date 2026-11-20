import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// This app lives inside the Web-Programming repo, which GitHub Pages serves
// from main. `npm run build` writes the site to ../app, and it is published at
// https://asilbek-maker.github.io/Web-Programming/Week11/Week11-2/app/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../app',
    emptyOutDir: true,
  },
})
