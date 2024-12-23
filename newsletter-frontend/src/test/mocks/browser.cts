import { setupWorker } from 'msw/browser';
import { newsletterHandlers } from './handlers/newsletterHandlers';
import { userPreferencesHandlers } from './handlers/userPreferencesHandlers';

export const worker = setupWorker(...newsletterHandlers, ...userPreferencesHandlers);
