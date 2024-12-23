import { createConnection, Connection } from 'typeorm';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
import { Interest } from '../models/Interest';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

export const initializeTestDatabase = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.TEST_DB_HOST || 'localhost',
      port: parseInt(process.env.TEST_DB_PORT || '5432'),
      username: process.env.TEST_DB_USERNAME || 'postgres',
      password: process.env.TEST_DB_PASSWORD || 'postgres',
      database: process.env.TEST_DB_NAME || 'newsletter_test_db',
      entities: [User, SecurityEvent, Interest, Subscription, UserInteraction],
      synchronize: true,
      dropSchema: true,
      logging: false,
    });

    console.log('Test database connection established');
    return connection;
  } catch (error) {
    console.error('Error connecting to test database:', error);
    throw error;
  }
};

export const closeTestDatabase = async (connection: Connection): Promise<void> => {
  try {
    await connection.close();
    console.log('Test database connection closed');
  } catch (error) {
    console.error('Error closing test database connection:', error);
    throw error;
  }
};
