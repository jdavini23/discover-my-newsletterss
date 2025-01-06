import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

// Redis client configuration
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD
});

// Custom rate limit configuration types
interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  statusCode?: number;
}

// Predefined rate limit configurations
const RATE_LIMIT_CONFIGS = {
  // Strict limits for sensitive operations
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: 'Too many authentication attempts, please try again later',
    statusCode: 429
  },
  
  // More lenient for general API access
  API: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: 'Too many requests, please try again later',
    statusCode: 429
  },
  
  // Very strict for password reset
  PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts per hour
    message: 'Too many password reset attempts, please try again later',
    statusCode: 429
  }
};

// Create a rate limiter with Redis store
function createRateLimiter(config: RateLimitConfig) {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.call(...args),
      prefix: 'rate_limit:'
    }),
    windowMs: config.windowMs,
    max: config.max,
    message: config.message,
    statusCode: config.statusCode,
    
    // Custom handler for rate limit exceeded
    handler: (req: Request, res: Response, next: NextFunction, options) => {
      res.status(options.statusCode || 429).json({
        message: options.message || 'Too many requests, please try again later',
        code: 'RATE_LIMIT_EXCEEDED'
      });
    },
    
    // Use IP and user ID (if available) for more precise tracking
    keyGenerator: (req: Request) => {
      const userId = req.user ? req.user.id : '';
      return `${req.ip}_${userId}`;
    }
  });
}

// Export rate limiters for different endpoints
export const rateLimiters = {
  auth: createRateLimiter(RATE_LIMIT_CONFIGS.AUTH),
  api: createRateLimiter(RATE_LIMIT_CONFIGS.API),
  passwordReset: createRateLimiter(RATE_LIMIT_CONFIGS.PASSWORD_RESET)
};
