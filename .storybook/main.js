import { mergeConfig } from 'vite';
import path from 'path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: [
    "../src/**/*.mdx", 
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: true,
      },
    },
  },
  async viteFinal(config, { configType }) {
    const projectRoot = path.resolve(__dirname, '..');
    
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(projectRoot, 'src'),
          '@components': path.resolve(projectRoot, 'src/components'),
          '@services': path.resolve(projectRoot, 'src/services'),
          '@contexts': path.resolve(projectRoot, 'src/contexts'),
          '@hooks': path.resolve(projectRoot, 'src/hooks'),
          '@utils': path.resolve(projectRoot, 'src/utils'),
          '@types': path.resolve(projectRoot, 'src/types'),
        },
      },
      optimizeDeps: {
        include: [
          "@storybook/blocks",
          "@storybook/addon-docs",
          "@storybook/test",
          "@testing-library/jest-dom",
          "@testing-library/react",
          "@testing-library/user-event"
        ],
      },
      build: {
        rollupOptions: {
          output: {
            // Customize chunk sizes if needed
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            }
          }
        }
      },
      server: {
        headers: {
          'Content-Security-Policy': 
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
            "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "img-src 'self' data: https:; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://o4504455926185984.ingest.us.sentry.io; " +
            "connect-src 'self' https: https://o4504455926185984.ingest.us.sentry.io; " +
            "report-uri https://o4504455926185984.ingest.us.sentry.io/api/4508260154015744/envelope/"
        }
      }
    });
  },
};
