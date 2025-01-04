/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          hover: '#357ABD',
          light: '#6BA5E7',
          dark: '#3576C4',
          50: '#E5F0FF',
          100: '#C7D9F5',
          200: '#A5C9F2',
          300: '#87B9F4',
          400: '#6BA5E7',
          500: '#4A90E2',
          600: '#357ABD',
          700: '#2F6C9F',
          800: '#235A8D',
          900: '#1B4D7A',
          dark: {
            DEFAULT: '#2F6C9F',
            50: '#1B4D7A',
            100: '#235A8D',
            500: '#4A90E2',
          },
        },
        secondary: {
          DEFAULT: '#F5A623',
          hover: '#E0911A',
          light: '#F7B94D',
          dark: '#D68C1A',
          50: '#FFF7E5',
          100: '#FFE4C7',
          200: '#FFD7A5',
          300: '#FFC98F',
          400: '#F7B94D',
          500: '#F5A623',
          600: '#E0911A',
          700: '#C87F14',
          800: '#B36C0E',
          900: '#9F5C09',
          dark: {
            DEFAULT: '#D68C1A',
            50: '#9F5C09',
            100: '#B36C0E',
            500: '#F5A623',
          },
        },
        accent: {
          DEFAULT: '#50E3C2',
          hover: '#3DCBAA',
          light: '#72E8CF',
          dark: '#2DB69A',
          50: '#E6FFFA',
          100: '#C5F7F4',
          200: '#A2F0E8',
          300: '#7CE8E0',
          400: '#72E8CF',
          500: '#50E3C2',
          600: '#3DCBAA',
          700: '#34B98A',
          800: '#2DA67D',
          900: '#248F6A',
        },
        background: {
          light: '#F8F9FA',
          dark: '#121212',
          surface: '#1E1E1E',
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        text: {
          primary: {
            light: '#333333',
            dark: '#EDEDED',
          },
          secondary: {
            light: '#666666',
            dark: '#A1A1A1',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs-mobile': '0.65rem',
        'sm-mobile': '0.75rem',
        'base-mobile': '0.875rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      screens: {
        xs: '375px', // Extra small devices
        sm: '640px', // Small devices
        md: '768px', // Medium devices
        lg: '1024px', // Large devices
        xl: '1280px', // Extra large devices
        '2xl': '1536px', // 2X large devices
      },
      boxShadow: {
        'dark-sm': '0 1px 3px 0 rgba(255, 255, 255, 0.1)',
        'dark-md':
          '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [
    // Optional: Add responsive font size plugin
    function ({ addUtilities }) {
      const responsiveFontSizes = {
        '.text-responsive-xs': {
          '@apply text-xs-mobile sm:text-xs': {},
        },
        '.text-responsive-sm': {
          '@apply text-sm-mobile sm:text-sm': {},
        },
        '.text-responsive-base': {
          '@apply text-base-mobile sm:text-base': {},
        },
      };
      addUtilities(responsiveFontSizes);
    },
  ],
};
