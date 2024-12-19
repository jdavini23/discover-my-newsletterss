import { setupTestDatabase, teardownTestDatabase, clearDatabase } from '../config/testDatabase';

beforeAll(async () => {
  await setupTestDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await teardownTestDatabase();
});

export { clearDatabase };
