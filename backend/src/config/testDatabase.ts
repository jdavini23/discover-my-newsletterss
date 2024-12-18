import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { Newsletter } from '../models/Newsletter';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

export const TestDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'joedavini',
  database: 'newsletters_test',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Interest,
    Newsletter,
    Subscription,
    UserInteraction
  ]
});

export const setupTestDatabase = async () => {
  try {
    await TestDataSource.initialize();
    console.log('Test database initialized');
  } catch (error) {
    console.error('Error initializing test database', error);
    throw error;
  }
};

export const teardownTestDatabase = async () => {
  try {
    await TestDataSource.destroy();
    console.log('Test database connection closed');
  } catch (error) {
    console.error('Error closing test database', error);
  }
};
