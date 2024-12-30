/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutralText: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          500: '#1F2937',
          700: '#111827',
          900: '#0F172A'
        },
        neutralBackground: {
          50: '#FFFFFF',
          100: '#F9FAFB',
          200: '#F3F4F6',
          300: '#E5E7EB',
          500: '#D1D5DB',
          700: '#6B7280'
        },
        primary: {
          DEFAULT: '#4CAF50',
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#4CAF50',
          700: '#388E3C',
          900: '#1B5E20'
        },
        secondary: {
          DEFAULT: '#FF5722',
          50: '#FBE9E7',
          100: '#FFCCBC',
          500: '#FF5722',
          700: '#E64A19',
          900: '#BF360C'
        },
        accent1: {
          DEFAULT: '#3B82F6',
          50: '#E6F2FF',
          100: '#BCDAFF',
          500: '#3B82F6',
          700: '#1D4ED8',
          900: '#1E3A8A'
        },
        accent2: {
          DEFAULT: '#FFC107',
          50: '#FFF3E0',
          100: '#FFE0B2',
          500: '#FFC107',
          700: '#FFA000',
          900: '#FF6F00'
        },
        darkBackground: {
          DEFAULT: '#1A202C',
          50: '#2D3748',
          100: '#4A5568',
          500: '#1A202C',
          700: '#171923'
        },
        darkText: {
          DEFAULT: '#E2E8F0',
          50: '#FFFFFF',
          100: '#F7FAFC',
          500: '#E2E8F0',
          700: '#CBD5E0'
        },
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#000000'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
