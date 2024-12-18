import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// Import all entities
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { Newsletter } from '../models/Newsletter';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development', // Be cautious in production
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User,
    Interest,
    Newsletter,
    Subscription,
    UserInteraction
  ],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});

// Initialize the database connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error during database initialization', error);
    process.exit(1);
  }
};