import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import database initialization
import { initializeDatabase } from './config/database';
import { initializeRedis, closeRedisConnection } from './config/redis';

// Import routes
import authRoutes from './routes/authRoutes';
import interestRoutes from './routes/interestRoutes';

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

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

const startServer = async () => {
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
      server.close(() => {
        console.log('HTTP server closed');
        
        // Close database and Redis connections
        closeRedisConnection();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

// Run the server
startServer();