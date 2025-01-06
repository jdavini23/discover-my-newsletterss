import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { expect } from '@storybook/test';

// Ensure global expect is available
if (typeof globalThis.expect === 'undefined') {
  globalThis.expect = expect;
}

// Mock fetch for tests
globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Suppress specific warnings
const originalWarn = console.warn;
console.warn = (msg, ...args) => {
  if (!msg.includes('React.createElement')) {
    originalWarn(msg, ...args);
  }
};

// Add any global test setup here
beforeEach(() => {
  jest.clearAllMocks();
});
