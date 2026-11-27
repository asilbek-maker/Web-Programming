import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The weather dashboard (Friday homework), built into ../weather.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../weather',
    emptyOutDir: true,
  },
})
