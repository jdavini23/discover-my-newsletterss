import React from 'react';
import { handlers } from '../src/mocks/handlers';
import '../src/styles/global.css';

// Import testing libraries
import '@testing-library/jest-dom';
import { expect } from '@storybook/test';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/themes';

// Ensure global expect is available
if (typeof globalThis.expect === 'undefined') {
  globalThis.expect = expect;
}

/** @type {import('@storybook/react').Preview} */
export default {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a202c' },
      ],
    },
    layout: 'centered',
    msw: {
      handlers: handlers,
    },
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      source: {
        type: 'code',
      },
      description: {
        component: '## Component Description',
        story: '### Story Description',
      },
    },
    a11y: {
      // Accessibility configuration
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    // Add CSP headers
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
  },
  decorators: [
    // Theme provider
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
    }),
    // Consistent layout wrapper
    (Story) => {
      return React.createElement(
        'div', 
        { 
          style: { 
            padding: '20px', 
            maxWidth: '1200px', 
            margin: '0 auto' 
          } 
        }, 
        React.createElement(Story)
      );
    },
  ],
};
