import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'build',
      // Prevent generation of .js files during TypeScript compilation
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    },
    // Add environment variable support
    define: {
      'import.meta.env': JSON.stringify(env),
      'process.env': env
    },
    // Explicitly set TypeScript options
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react'
    },
    // Ensure proper file extensions are handled
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    }
  }
})
