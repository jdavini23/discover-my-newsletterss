const request = require('supertest');
const { app } = require('../src/app');
const Redis = require('ioredis');

describe('Security Middleware Tests', () => {
  let redisClient;

  beforeAll(() => {
    // Initialize Redis client for testing
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379')
    });
  });

  afterAll(async () => {
    // Close Redis connection
    await redisClient.quit();
  });

  // 1. Rate Limiting Tests
  describe('Rate Limiting', () => {
    it('should apply global rate limiting', async () => {
      const requests = Array(110).fill(0).map(() => 
        request(app).get('/api/newsletters')
      );

      const responses = await Promise.all(requests);
      
      // Check if later requests are rate limited
      const rateLimitedResponses = responses.filter(
        res => res.status === 429
      );

      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });

    it('should have stricter rate limiting for auth routes', async () => {
      const requests = Array(10).fill(0).map(() => 
        request(app)
          .post('/api/auth/login')
          .send({ 
            email: 'test@example.com', 
            password: 'password123' 
          })
      );

      const responses = await Promise.all(requests);
      
      // Check if auth routes have more aggressive rate limiting
      const rateLimitedResponses = responses.filter(
        res => res.status === 429
      );

      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  // 2. Input Validation Tests
  describe('Input Validation', () => {
    it('should sanitize and validate input', async () => {
      // Test XSS prevention
      const xssPayload = {
        name: '<script>alert("XSS")</script>User',
        email: 'test@example.com<script>',
        description: 'Malicious <img src=x onerror=alert("XSS")> content'
      };

      const response = await request(app)
        .post('/api/users')
        .send(xssPayload);

      // Expect sanitized input or rejection
      expect(response.body.name).not.toContain('<script>');
      expect(response.body.email).not.toContain('<script>');
      expect(response.body.description).not.toContain('onerror');
    });

    it('should reject invalid email formats', async () => {
      const invalidEmails = [
        'invalid-email',
        'invalid@email',
        'invalid@.com',
        '<script>alert("XSS")</script>'
      ];

      for (const email of invalidEmails) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({ email, password: 'validPassword123' });

        // Expect validation error
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      }
    });
  });

  // 3. CSRF Protection Tests
  describe('CSRF Protection', () => {
    it('should require CSRF token for state-changing routes', async () => {
      const response = await request(app)
        .post('/api/newsletters')
        .send({ title: 'Test Newsletter' });

      // Expect CSRF token error
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'CSRF Token Validation Failed');
    });

    it('should allow requests with valid CSRF token', async () => {
      // First, get a CSRF token
      const tokenResponse = await request(app).get('/api/csrf-token');
      const csrfToken = tokenResponse.body.csrfToken;

      const response = await request(app)
        .post('/api/newsletters')
        .set('CSRF-Token', csrfToken)
        .send({ title: 'Test Newsletter' });

      // Expect successful response
      expect(response.status).not.toBe(403);
    });
  });

  // 4. Security Headers Tests
  describe('Security Headers', () => {
    it('should set secure HTTP headers', async () => {
      const response = await request(app).get('/api/newsletters');

      // Check for specific security headers
      expect(response.headers['x-xss-protection']).toBeDefined();
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['strict-transport-security']).toBeDefined();
      expect(response.headers['x-content-type-options']).toBe('nosniff');
    });
  });

  // 5. CORS Configuration Tests
  describe('CORS Configuration', () => {
    it('should reject requests from unauthorized origins', async () => {
      const response = await request(app)
        .get('/api/newsletters')
        .set('Origin', 'https://malicious-site.com');

      // Expect CORS rejection
      expect(response.status).toBe(403);
    });

    it('should allow requests from allowed origins', async () => {
      const response = await request(app)
        .get('/api/newsletters')
        .set('Origin', 'https://yourdomain.com');

      // Expect successful response
      expect(response.status).not.toBe(403);
    });
  });

  // 6. Error Handling Tests
  describe('Error Handling', () => {
    it('should handle unexpected errors gracefully', async () => {
      // Simulate an internal server error
      const response = await request(app)
        .get('/api/error-test'); // Assuming this route intentionally throws an error

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });
});
