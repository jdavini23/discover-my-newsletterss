import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Simple test handler
const handler = http.get('/api/newsletters/search', ({ request }) => {
  console.log('Handler called with:', {
    method: request.method,
    url: request.url
  });

  return HttpResponse.json({
    message: 'Handler works!',
    newsletters: [
      { id: '1', title: 'Tech Insider' }
    ]
  });
});

// Create server with simple handler
export const server = setupServer(handler);

// Setup server lifecycle
export function setupMockServer() {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'warn' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
