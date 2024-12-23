import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
import { Interest } from '../models/Interest';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'newsletter_development',
  entities: [User, SecurityEvent, Interest, Subscription, UserInteraction],
  synchronize: true, // This will create tables automatically
  logging: process.env.NODE_ENV !== 'production',
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};
