import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      (await import('vite-tsconfig-paths')).default(),
      // Performance and bundle analysis
      visualizer({
        filename: './stats.html',
        open: mode === 'production',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
        '@components': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          './src/components'
        ),
        '@services': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/services'),
        '@contexts': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/contexts'),
        '@hooks': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/hooks'),
        '@utils': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/utils'),
        '@types': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/types'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      open: true,
      strictPort: true, // Prevent using an already occupied port
      cors: true, // Enable CORS
    },
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT || '4173'),
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production',
      target: 'esnext', // Modern browser support
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split node_modules into separate chunks
            if (id.includes('node_modules')) {
              if (id.includes('@mui') || id.includes('react-router')) {
                return 'vendor-ui';
              }
              if (id.includes('react-hot-toast') || id.includes('zustand')) {
                return 'vendor-libs';
              }
              return 'vendor';
            }
          },
          format: 'es',
        },
      },
      chunkSizeWarningLimit: 500,
      reportCompressedSize: true, // Show compressed file sizes
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.cts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  };
});
