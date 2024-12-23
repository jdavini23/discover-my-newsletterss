import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers
export const worker = setupWorker(...handlers);

// Optional: Add logging using the new approach
if (import.meta.env.DEV) {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    console.log('Intercepted fetch:', ...args);
    return originalFetch(...args);
  };
}

export {};
