import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Monday and Friday practice components, built into ../practice.
// Week12-2/index.html shows each one in an iframe: practice/?demo=counter-history
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../practice',
    emptyOutDir: true,
  },
})
