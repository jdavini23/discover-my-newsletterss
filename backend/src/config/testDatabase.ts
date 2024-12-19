import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { Newsletter } from '../models/Newsletter';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

export const TestDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,  // Updated to match Docker Compose port
  username: 'root',
  password: 'root',
  database: 'newsletter_test',
  entities: [User, Interest, Newsletter, Subscription, UserInteraction],
  synchronize: true,
  dropSchema: true,
  logging: false
});

export const setupTestDatabase = async () => {
  try {
    // Initialize the test database connection
    if (!TestDataSource.isInitialized) {
      await TestDataSource.initialize();
    }

    // Drop all tables and recreate them
    await TestDataSource.synchronize(true);

    console.log('Test database initialized successfully');
  } catch (error) {
    console.error('Error initializing test database:', error);
    throw error;
  }
};

export const clearDatabase = async () => {
  try {
    if (TestDataSource.isInitialized) {
      const entities = TestDataSource.entityMetadatas;
      for (const entity of entities) {
        const repository = TestDataSource.getRepository(entity.target);
        await repository.clear();
      }
    }
  } catch (error) {
    console.error('Error clearing test database:', error);
    throw error;
  }
};

export const teardownTestDatabase = async () => {
  try {
    if (TestDataSource.isInitialized) {
      await TestDataSource.destroy();
      console.log('Test database connection closed');
    }
  } catch (error) {
    console.error('Error closing test database connection:', error);
    throw error;
  }
};
