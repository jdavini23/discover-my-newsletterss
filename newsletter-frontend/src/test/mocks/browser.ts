import { setupWorker, SetupWorker } from 'msw/browser';
import { newsletterHandlers } from "./handlers/newsletterHandlers";
import { userPreferencesHandlers } from "./handlers/userPreferencesHandlers";
import { userHandlers } from "./handlers/userHandlers";

export const worker: SetupWorker = setupWorker(
  ...newsletterHandlers,
  ...userPreferencesHandlers,
  ...userHandlers
);
