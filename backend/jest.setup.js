const { initializeDatabase, closeDatabase } = require('./src/config/testDatabase');

// Setup before all tests
beforeAll(async () => {
  await initializeDatabase();
});

// Teardown after all tests
afterAll(async () => {
  await closeDatabase();
});

// Reset database between tests
beforeEach(async () => {
  // Add any necessary database reset logic
});

afterEach(async () => {
  // Add any necessary cleanup logic
});
