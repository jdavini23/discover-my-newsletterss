import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import hpp from 'hpp';

export const _securityMiddleware = (_req: Request, _res: Response, _next: NextFunction): void => {
  // Helmet helps secure Express apps by setting various HTTP headers
  app.use(helmet());

  // Prevent HTTP Parameter Pollution attacks
  app.use(hpp());

  // CORS configuration
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Rate limiting to prevent brute-force attacks
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
  });
  app.use(limiter);
};
