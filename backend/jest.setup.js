const Redis = require('ioredis');
const { setupTestDatabase, clearDatabase, teardownTestDatabase } = require('./src/config/testDatabase');

// Mock Redis client for tests
class MockRedisClient {
  constructor() {
    this.data = new Map();
    this.status = 'end';
  }

  async connect() {
    this.status = 'connect';
    return this;
  }

  async quit() {
    this.status = 'end';
    this.data.clear();
    return this;
  }

  async flushall() {
    this.data.clear();
    return 'OK';
  }

  async set(key, value, mode, expiry) {
    this.data.set(key, value);
    return 'OK';
  }

  async get(key) {
    return this.data.get(key) || null;
  }

  async del(key) {
    this.data.delete(key);
    return 1;
  }

  removeAllListeners() {
    return this;
  }

  on() {
    return this;
  }
}

// Replace Redis client with mock for tests
jest.mock('./src/config/redis', () => ({
  redisClient: new MockRedisClient(),
  cacheNewsletter: jest.fn(),
  getCachedNewsletter: jest.fn(),
  deleteCachedNewsletter: jest.fn(),
}));

// Setup before all tests
beforeAll(async () => {
  try {
    // Setup test database
    await setupTestDatabase();
  } catch (error) {
    console.error('Test setup error:', error);
    throw error;
  }
});

// Reset database between tests
beforeEach(async () => {
  await clearDatabase();
});

// Teardown after all tests
afterAll(async () => {
  try {
    // Teardown test database
    await teardownTestDatabase();
  } catch (error) {
    console.error('Test teardown error:', error);
    throw error;
  }
});
