import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import path from 'path';

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
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '**/index.ts',
          '**/*.d.ts',
          '**/types/**',
          '**/constants/**',
          '**/test/**',
          '**/*.config.{js,ts}'
        ]
      },
      css: {
        include: [/\.module\.css$/]
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
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@services': path.resolve(__dirname, './src/services'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@utils': path.resolve(__dirname, './src/utils')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    }
  }
})
