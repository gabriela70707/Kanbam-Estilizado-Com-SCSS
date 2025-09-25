import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test:{ //configurando o arquivo para teste
    globals: true,
    environment: 'jsdom'
  }
})
