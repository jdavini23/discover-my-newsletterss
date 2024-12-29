import { ChakraProvider } from '@chakra-ui/react';
import { render as rtlRender } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const customRender = (ui: React.ReactElement, options = {}) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ChakraProvider>{children}</ChakraProvider>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };

// Mock fetch globally
global.fetch = vi.fn();

// Reset all mocks before each test
beforeEach(() => {
  vi.resetAllMocks();
});
