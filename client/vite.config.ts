import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

// 🔧 Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // 👇 Disable esbuild pre-bundling by forcing SWC/rollup only
    esbuildOptions: undefined,
  },
  build: {
    target: 'esnext', // avoid triggering esbuild transforms
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
})
