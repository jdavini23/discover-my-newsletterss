/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';

export default {
  // Explicitly define content sources to resolve Tailwind warning
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
    // Add Storybook files to content sources
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom color palette
      colors: {
        primary: {
          DEFAULT: '#3498db',
          light: '#5dade2',
          dark: '#2980b9',
        },
        secondary: {
          DEFAULT: '#2ecc71',
          light: '#58d68d',
          dark: '#27ae60',
        },
        background: {
          DEFAULT: '#f4f4f4',
          light: '#ffffff',
          dark: '#e0e0e0',
        },
        // Add semantic colors for better theming
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db',
      },
      // Enhanced typography and font scaling
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Add custom spacing and sizing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // Add custom border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      // Add custom shadows
      boxShadow: {
        'custom-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'custom-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // Responsive breakpoints
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    // Override default values if needed
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
  },
  // Explicitly add plugins to resolve configuration
  plugins: [
    forms,
    typography,
    aspectRatio,
    containerQueries,
  ],
  // Ensure optimal purging in production
  purge: {
    content: [
      './index.html', 
      './src/**/*.{js,ts,jsx,tsx}',
      './src/**/*.stories.{js,ts,jsx,tsx}',
    ],
    // Safelist critical classes that might be dynamically generated
    safelist: [
      'bg-primary',
      'bg-secondary',
      'text-error',
      'text-success',
      'w-full',
      'h-full',
      'opacity-0',
      'opacity-100',
      'translate-x-0',
      'translate-x-full',
    ]
  },
  // Add safelist to ensure specific classes are always included
  safelist: [
    'bg-primary',
    'bg-secondary',
    'text-success',
    'text-error',
  ],
  // Dark mode configuration
  darkMode: 'class',
};
