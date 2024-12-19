import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

// Define test database configuration interface
interface TestDatabaseConfig {
  type: 'sqlite';
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: Function[];
}

// Create test database configuration
const createTestDatabaseConfig = (): TestDatabaseConfig => ({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [User, Newsletter, Interest, Subscription, UserInteraction],
});

// Create test data source with explicit return type
export const createTestDataSource = (): DataSource => {
  return new DataSource(createTestDatabaseConfig());
};

// Initialize test database with explicit return type
export const initializeTestDatabase = async (): Promise<DataSource> => {
  try {
    const dataSource = createTestDataSource();
    await dataSource.initialize();
    console.log('Test database initialized successfully');

    // Optional: Log database state
    const interestRepo = dataSource.getRepository(Interest);
    const interests = await interestRepo.find();
    console.log('Current Interests in Database:', interests);

    return dataSource;
  } catch (error) {
    console.error('Test database initialization error:', error);
    throw error;
  }
};

// Close test database connection with explicit return type
export const closeTestDatabase = async (dataSource?: DataSource): Promise<void> => {
  if (dataSource && dataSource.isInitialized) {
    try {
      await dataSource.destroy();
      console.log('Test database connection closed');
    } catch (error) {
      console.error('Error closing test database:', error);
    }
  }
};

// Get test data source with memoization
export const getTestDataSource = (() => {
  let testDataSource: DataSource | null = null;

  return (): DataSource => {
    if (!testDataSource) {
      testDataSource = createTestDataSource();
    }
    return testDataSource;
  };
})();

export const setupTestDatabase = async (): Promise<void> => {
  try {
    const dataSource = await initializeTestDatabase();

    // If already initialized, destroy first
    if (dataSource.isInitialized) {
      await closeTestDatabase(dataSource);
    }

    // Reinitialize the database
    await initializeTestDatabase();

    console.log('Test database reinitialized successfully');
  } catch (error) {
    console.error('Error reinitializing test database:', error);
    throw error;
  }
};

export const destroyTestDatabase = async (): Promise<void> => {
  try {
    const dataSource = getTestDataSource();

    if (dataSource.isInitialized) {
      await closeTestDatabase(dataSource);
      console.log('Test database destroyed successfully');
    }
  } catch (error) {
    console.error('Error destroying test database:', error);
  }
};
