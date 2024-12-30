export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const API_URL = `${API_BASE_URL}/api`;
export const ENABLE_LOGGING = process.env.VITE_ENABLE_LOGGING === 'true';
export const ENV_NAME = process.env.VITE_ENV_NAME || 'development';

export const ENV = {
  API_BASE_URL,
  API_URL,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FIREBASE_CONFIG: {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  },
  ENABLE_LOGGING,
  ENV_NAME,
  PERFORMANCE_MONITORING: process.env.VITE_PERFORMANCE_MONITORING === 'true'
};

export const getCurrentConfig = () => ENV;
