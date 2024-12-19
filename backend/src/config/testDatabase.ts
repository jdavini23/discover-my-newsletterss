import { DataSource } from 'typeorm';
import path from 'path';

// Import all entities
import { User } from '../models/User';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

let testDataSource: DataSource | null = null;

export const getTestDataSource = () => {
  if (!testDataSource) {
    testDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [
        User,
        Newsletter, 
        Interest, 
        Subscription, 
        UserInteraction
      ]
    });
  }
  return testDataSource;
};

export const setupTestDatabase = async () => {
  try {
    const dataSource = getTestDataSource();
    
    // If already initialized, destroy first
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    
    // Initialize the database
    await dataSource.initialize();
    
    console.log('Test database initialized successfully');

    // Log the current state of the database
    const interestRepo = dataSource.getRepository(Interest);
    const interests = await interestRepo.find();
    console.log('Current Interests in Database:', interests);
  } catch (error) {
    console.error('Error initializing test database:', error);
    throw error;
  }
};

export const clearDatabase = async () => {
  try {
    const dataSource = getTestDataSource();
    
    if (dataSource.isInitialized) {
      const entities = dataSource.entityMetadatas;
      for (const entity of entities) {
        const repository = dataSource.getRepository(entity.target);
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
    const dataSource = getTestDataSource();
    
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Test database destroyed successfully');
    }
  } catch (error) {
    console.error('Error destroying test database:', error);
    throw error;
  }
};
