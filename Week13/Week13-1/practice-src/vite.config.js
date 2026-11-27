import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Week 13-1 homework and practice components, built into ../practice.
// Week13-1/index.html shows each one in an iframe: practice/?demo=profile-editor
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../practice',
    emptyOutDir: true,
  },
})
