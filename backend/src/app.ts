import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import interestRoutes from './routes/interestRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import userPreferencesRoutes from './routes/userPreferencesRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/preferences', userPreferencesRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

export { app };
