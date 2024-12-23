import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      open: true,
    },
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT || '4173'),
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production',
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
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
      css: true,
    },
  };
});
