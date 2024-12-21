import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env.NODE_ENV': '"staging"',
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'zustand'],
          utils: ['./src/utils'],
        },
      },
    },
    target: 'esnext',
    minify: true,
  },
  server: {
    port: 3001,
    cors: true,
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 3001,
  },
});
