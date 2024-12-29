import { setupWorker } from 'msw/browser'
import { newsletterHandlers } from "./handlers/newsletterHandlers";
import { userPreferencesHandlers } from "./handlers/userPreferencesHandlers";
import { userHandlers } from "./handlers/userHandlers";

export const worker = setupWorker(
  ...newsletterHandlers,
  ...userPreferencesHandlers,
  ...userHandlers
);
