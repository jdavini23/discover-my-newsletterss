import { setupServer } from 'msw/node'
import { newsletterHandlers } from "./handlers/newsletterHandlers";
import { userPreferencesHandlers } from "./handlers/userPreferencesHandlers";
import { userHandlers } from "./handlers/userHandlers";

export const server = setupServer(
  ...newsletterHandlers,
  ...userPreferencesHandlers,
  ...userHandlers
);
