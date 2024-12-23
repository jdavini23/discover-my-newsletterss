import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
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
                return 'vendor-ui';
              }
              if (id.includes('react-hot-toast') || id.includes('zustand')) {
                return 'vendor-libs';
              }
              return 'vendor';
            }

            // Split pages into separate chunks
            if (id.includes('/src/pages/')) {
              return 'pages';
            }
          },
          format: 'es',
        },
      },
      chunkSizeWarningLimit: 500, // Increase chunk size warning limit
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  };
});
