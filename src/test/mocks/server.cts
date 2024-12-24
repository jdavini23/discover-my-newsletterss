import { setupServer } from 'msw/node';
import newsletterHandlers from './handlers/newsletterHandlers';
import userPreferencesHandlers from './handlers/userPreferencesHandlers';

const server = setupServer(
  ...newsletterHandlers,
  ...userPreferencesHandlers
);

export default server;
