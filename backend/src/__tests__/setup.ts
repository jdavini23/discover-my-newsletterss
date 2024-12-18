import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { Newsletter } from '../models/Newsletter';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

const entities = [
  UserInteraction,
  Subscription,
  Newsletter,
  Interest,
  User
];

// Create a test-specific data source
export const testDataSource = AppDataSource;

// Global setup for tests
export const setup = async () => {
  // Initialize the test database
  await setupDatabase();
};

// Global teardown for tests
export const teardown = async () => {
  // Clear all tables
  await clearDatabase();

  // Close the database connection
  await teardownDatabase();
};

// Helper function to clear database between tests
export async function clearDatabase() {
  const queryRunner = testDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Disable foreign key checks
    await queryRunner.query('SET session_replication_role = replica;');

    // Clear all tables with CASCADE
    for (const entity of entities) {
      const tableName = testDataSource.getRepository(entity).metadata.tableName;
      await queryRunner.query(`TRUNCATE TABLE "${tableName}" CASCADE;`);
    }

    // Re-enable foreign key checks
    await queryRunner.query('SET session_replication_role = origin;');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  } finally {
    await queryRunner.release();
  }
}

export async function setupDatabase() {
  await testDataSource.initialize();
}

export async function teardownDatabase() {
  await testDataSource.destroy();
}

// Placeholder test to ensure Jest configuration is valid
describe('Test Setup', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });
});
