import { setupTestDatabase, getTestDataSource } from '../config/testDatabase';
;

// Mock Redis for testing
jest.mock('../config/redis', () => ({
  redisClient: {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  },
}));

// Mocking the data source
jest.mock('../config/database', () => ({
  AppDataSource: getTestDataSource(),
}));

// Clear database before each test
beforeEach(async () => {
  const dataSource = getTestDataSource();

  // Drop and recreate all tables
  await dataSource.dropDatabase();
  await dataSource.synchronize();
});

// Ensure database is set up before all tests
beforeAll(async () => {
  await setupTestDatabase();
});
