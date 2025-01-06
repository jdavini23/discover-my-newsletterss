import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

// Security Imports
import { globalRateLimiter, authRateLimiter, newsletterRateLimiter } from './middleware/rateLimiter';
import { 
  securityHeaders, 
  corsOptions, 
  inputValidation, 
  errorHandler as securityErrorHandler 
} from './middleware/securityMiddleware';
import { 
  csrfProtection, 
  csrfErrorHandler, 
  generateCsrfToken, 
  validateCsrfToken 
} from './middleware/csrfProtection';

// Route Imports
import authRoutes from './routes/authRoutes';
import interestRoutes from './routes/interestRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import userPreferencesRoutes from './routes/userPreferencesRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import csrfRoutes from './routes/csrfRoutes';
import { userRouter } from './controllers/userController';

const app = express();

// Security Middleware Stack
// 1. Helmet for setting secure HTTP headers
app.use(securityHeaders);

// 2. CORS with strict configuration
app.use(cors(corsOptions));

// 3. Body parsing with size limit
app.use(express.json({ 
  limit: '10kb' // Prevent large payload attacks
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10kb' 
}));

// 4. Rate Limiting
// Global rate limiter for all routes
app.use(globalRateLimiter);

// Specific rate limiters for sensitive routes
app.use('/api/auth', authRateLimiter);
app.use('/api/newsletters', newsletterRateLimiter);

// 5. Input Validation and Sanitization
app.use(inputValidation);

// 6. CSRF Protection
// Generate CSRF token for all routes
app.use(generateCsrfToken);

// Validate CSRF token for state-changing routes
app.use('/api/auth', validateCsrfToken);
app.use('/api/preferences', validateCsrfToken);
app.use('/api/newsletters', validateCsrfToken);

// 7. Additional Security Middleware
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/preferences', userPreferencesRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/users', userRouter);
app.use('/api', csrfRoutes);

// CSRF Error Handler
app.use(csrfErrorHandler);

// 404 handler for undefined routes
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(securityErrorHandler);

export { app };
