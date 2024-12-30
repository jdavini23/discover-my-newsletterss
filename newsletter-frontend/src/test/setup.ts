import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { authHandlers } from './mocks/handlers/authHandlers.cts';
import { userPreferencesHandlers } from './mocks/handlers/userPreferencesHandlers.cts';

const server = setupServer(...handlers, ...authHandlers, ...userPreferencesHandlers);

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
