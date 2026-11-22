import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// This app lives inside the Web-Programming repo, which GitHub Pages serves
// from main. `npm run build` writes the site to ../app, published at
// https://asilbek-maker.github.io/Web-Programming/Week12/Week12-2/usestate/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../usestate',
    emptyOutDir: true,
  },
})
