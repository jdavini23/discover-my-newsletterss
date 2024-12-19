"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardown = exports.setup = exports.testDataSource = void 0;
exports.clearDatabase = clearDatabase;
exports.setupDatabase = setupDatabase;
exports.teardownDatabase = teardownDatabase;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Interest_1 = require("../models/Interest");
const Newsletter_1 = require("../models/Newsletter");
const Subscription_1 = require("../models/Subscription");
const UserInteraction_1 = require("../models/UserInteraction");
const entities = [
    UserInteraction_1.UserInteraction,
    Subscription_1.Subscription,
    Newsletter_1.Newsletter,
    Interest_1.Interest,
    User_1.User
];
// Create a test-specific data source
exports.testDataSource = database_1.AppDataSource;
// Global setup for tests
const setup = async () => {
    // Initialize the test database
    await setupDatabase();
};
exports.setup = setup;
// Global teardown for tests
const teardown = async () => {
    // Clear all tables
    await clearDatabase();
    // Close the database connection
    await teardownDatabase();
};
exports.teardown = teardown;
// Helper function to clear database between tests
async function clearDatabase() {
    const queryRunner = exports.testDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
        // Disable foreign key checks
        await queryRunner.query('SET session_replication_role = replica;');
        // Clear all tables with CASCADE
        for (const entity of entities) {
            const tableName = exports.testDataSource.getRepository(entity).metadata.tableName;
            await queryRunner.query(`TRUNCATE TABLE "${tableName}" CASCADE;`);
        }
        // Re-enable foreign key checks
        await queryRunner.query('SET session_replication_role = origin;');
    }
    catch (error) {
        console.error('Error clearing database:', error);
        throw error;
    }
    finally {
        await queryRunner.release();
    }
}
async function setupDatabase() {
    await exports.testDataSource.initialize();
}
async function teardownDatabase() {
    await exports.testDataSource.destroy();
}
// Placeholder test to ensure Jest configuration is valid
describe('Test Setup', () => {
    it('should pass a basic test', () => {
        expect(true).toBe(true);
    });
});
