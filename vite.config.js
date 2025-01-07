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
    define: {
      'process.env': env,
    },
    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-macros'],
        },
      }),
      tsconfigPaths(),
    ],
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
      dedupe: ['react', 'react-dom'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
      open: true,
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
        'zustand/middleware',
        'uuid',
        'framer-motion',
        '@radix-ui/react-icons',
        '@tailwindcss/forms',
        '@tailwindcss/typography',
        '@tailwindcss/aspect-ratio',
        '@tailwindcss/container-queries',
      ],
      exclude: ['react-error-overlay'],
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    esbuild: {
      // Ensure consistent React runtime
      jsxInject: `import React from 'react'`,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './jest.setup.js',
      exclude: [...configDefaults.exclude, '**/e2e/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  };
});
