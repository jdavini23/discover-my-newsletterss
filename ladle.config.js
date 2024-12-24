module.exports = {
  stories: ['./src/components/**/*.stories.{js,jsx,ts,tsx}'],
  entry: './src/components', // Path to your component directory
  theme: {
    colors: {
      primary: '#007BFF', // Match your branding
      background: '#F4F4F4',
      text: '#333333'
    },
    typography: {
      fontFamily: "'Inter', sans-serif"
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@hooks': '/src/hooks',
        '@services': '/src/services',
        '@stores': '/src/stores',
        '@types': '/src/types'
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'tailwindcss', 
        'firebase', 
        'styled-components', 
        'framer-motion',
        '@tanstack/react-query',
        'react-error-boundary',
        'zustand',
        '@radix-ui/react-icons',
        'react-hot-toast'
      ]
    },
    css: {
      postcss: './postcss.config.cjs'
    },
    define: {
      // Mock Firebase environment variables for Ladle
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify('mock-api-key'),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify('mock-auth-domain'),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify('mock-project-id'),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify('mock-storage-bucket'),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify('mock-sender-id'),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify('mock-app-id')
    }
  }
};
