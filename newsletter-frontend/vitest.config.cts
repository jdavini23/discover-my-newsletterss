import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.cts'],
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx,cts,ctsx}',
      'src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx,cts,ctsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    // Add verbose logging
    logHeapUsage: true,
    maxConcurrency: 5,
    reporters: ['verbose'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
