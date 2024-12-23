import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { resetAllMocks } from 'vitest-mock-extended';
import { server } from '@/test/mocks/server';

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Automatically clean up after each test
afterEach(() => {
  cleanup(); // Cleans up any rendered components
  resetAllMocks(); // Resets all mocks
  server.resetHandlers(); // Reset any request handlers that we may add during the tests
});

// Clean up after the tests are finished.
afterAll(() => server.close());

// Mock window.matchMedia for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill for structuredClone in JSDOM
if (!globalThis.structuredClone) {
  globalThis.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

// Mock browser APIs that might not be available in test environment
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Suppress specific warnings or errors during testing
const originalConsoleError = console.error;
console.error = (...args) => {
  const suppressedErrors = [
    /Warning: An update inside a test was not wrapped in act/,
    /Warning: ReactDOM.render is no longer supported/,
  ];

  if (!suppressedErrors.some(pattern => pattern.test(args[0]))) {
    originalConsoleError(...args);
  }
};

// Mock window.addEventListener('unhandledrejection')
window.addEventListener('unhandledrejection', (event) => {
  console.warn(`Unhandled promise rejection: ${event.reason}`);
});

// Mock Intersection Observer
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});
