import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockIDBFactory } from 'vitest-mock-extended';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Automatically clean up after each test
afterEach(() => {
  cleanup(); // Cleans up any rendered components
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
  globalThis.structuredClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
}

// Mock global IndexedDB
Object.defineProperty(window, 'indexedDB', {
  value: mockIDBFactory(),
  writable: true,
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Setup MSW server with default handlers
const server = setupServer(
  http.get('/api/example', () => {
    return HttpResponse.json({ message: 'Mocked response' });
  })
);

// Silence console warnings during tests
console.warn = vi.fn();
console.error = vi.fn();

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
