import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Adhan_Quran_V2/',   // <-- THIS IS THE FIX
})