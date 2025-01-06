/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'firebase/auth': 'firebase/auth',
        'firebase/firestore': 'firebase/firestore',
        zustand: 'zustand',
        uuid: 'uuid',
        'framer-motion': 'framer-motion',
        '@radix-ui/react-icons': '@radix-ui/react-icons',
        '@tailwindcss/forms': '@tailwindcss/forms',
        '@tailwindcss/typography': '@tailwindcss/typography',
        '@tailwindcss/aspect-ratio': '@tailwindcss/aspect-ratio',
        '@tailwindcss/container-queries': '@tailwindcss/container-queries',
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-hot-toast',
        '@tanstack/react-query',
        'react-error-boundary',
        'firebase/auth',
        'firebase/firestore',
        'zustand',
        'uuid',
        'framer-motion',
        '@radix-ui/react-icons',
        '@tailwindcss/forms',
        '@tailwindcss/typography',
        '@tailwindcss/aspect-ratio',
        '@tailwindcss/container-queries',
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.cts'],
      exclude: [...configDefaults.exclude, '**/playwright/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
    define: {
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(env.VITE_FIREBASE_API_KEY || ''),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(
        env.VITE_FIREBASE_AUTH_DOMAIN || ''
      ),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(
        env.VITE_FIREBASE_PROJECT_ID || ''
      ),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(
        env.VITE_FIREBASE_STORAGE_BUCKET || ''
      ),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
        env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''
      ),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(env.VITE_FIREBASE_APP_ID || ''),
    },
  };
});
