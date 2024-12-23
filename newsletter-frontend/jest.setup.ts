import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Explicitly type the mock to resolve namespace issues
jest.mock('./src/lib/firebase', () => ({
  auth: {},
  firestore: {},
}));

// Suppress console warnings during testing
const originalConsoleError = console.error;
console.error = (...args) => {
  const suppressedErrors = [
    /React does not recognize the.*prop on a DOM element/,
    /Warning: An update inside a test was not wrapped in act/,
  ];

  if (!suppressedErrors.some((pattern) => pattern.test(args[0]))) {
    originalConsoleError(...args);
  }
};
