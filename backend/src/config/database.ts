import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { Newsletter } from '../models/Newsletter';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'newsletters',
  entities: [User, Interest, Newsletter, Subscription, UserInteraction],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};