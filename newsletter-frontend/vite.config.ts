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
      sourcemap: mode === 'production' ? false : true,
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split node_modules into separate chunks
            if (id.includes('node_modules')) {
              // Group large libraries into their own chunks
              if (id.includes('@mui') || id.includes('react-router')) {
                return 'vendor-ui'
              }
              if (id.includes('react-hot-toast') || id.includes('zustand')) {
                return 'vendor-libs'
              }
              return 'vendor'
            }
            
            // Split pages into separate chunks
            if (id.includes('/src/pages/')) {
              return 'pages'
            }
          },
          format: 'es'
        }
      },
      chunkSizeWarningLimit: 500 // Increase chunk size warning limit
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
