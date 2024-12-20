"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testDatabase_1 = require("../config/testDatabase");
const testDatabase_2 = require("../config/testDatabase");
// Mock Redis for testing
jest.mock('../config/redis', () => ({
    redisClient: {
        set: jest.fn(),
        get: jest.fn(),
        del: jest.fn()
    }
}));
// Mocking the data source
jest.mock('../config/database', () => ({
    AppDataSource: (0, testDatabase_2.getTestDataSource)()
}));
// Clear database before each test
beforeEach(async () => {
    const dataSource = (0, testDatabase_2.getTestDataSource)();
    // Drop and recreate all tables
    await dataSource.dropDatabase();
    await dataSource.synchronize();
});
// Ensure database is set up before all tests
beforeAll(async () => {
    await (0, testDatabase_1.setupTestDatabase)();
});
