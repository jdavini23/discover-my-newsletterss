import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import database initialization
import { _initializeDatabase as initializeDatabase, closeDatabaseConnection } from './config/database';
import { initializeRedis, _closeRedisConnection as closeRedisConnection } from './config/redis';

// Import routes
import authRoutes from './routes/authRoutes';
import interestRoutes from './routes/interestRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import userPreferencesRoutes from './routes/userPreferencesRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/user', userPreferencesRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

const startServer = async (): Promise<void> => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Initialize Redis
    await initializeRedis();

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down server...');
      server.close(async () => {
        console.log('HTTP server closed');
        // Close database and Redis connections
        await Promise.all([
          closeRedisConnection(),
          closeDatabaseConnection()
        ]);
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Run the server
startServer();
