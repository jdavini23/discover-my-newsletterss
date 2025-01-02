/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
    },
  },
  darkMode: 'class',
  plugins: [],
};
