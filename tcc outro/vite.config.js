import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// O site fica em frontend/ (com o index.html) e usa a landing page de landing/.
export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  // libera o acesso à pasta landing/, que fica fora de frontend/
  server: { fs: { allow: ['..'] } },
  // o build vai para dist/ na raiz do projeto
  build: { outDir: '../dist', emptyOutDir: true },
})
