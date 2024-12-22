import { createConnection, Connection } from 'typeorm';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
import { Interest } from '../models/Interest';
import { Subscription } from '../models/Subscription';
import { UserInteraction } from '../models/UserInteraction';

export const initializeDatabase = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'newsletter_development',
      entities: [User, SecurityEvent, Interest, Subscription, UserInteraction],
      synchronize: true,  // This will create tables automatically
      logging: process.env.NODE_ENV !== 'production'
    });

    console.log('Database connection established');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

export const closeDatabase = async (connection: Connection): Promise<void> => {
  try {
    await connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};
