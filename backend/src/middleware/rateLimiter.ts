import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { securityLogger } from '../utils/logger';

// Redis configuration
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD
});

// Custom rate limit configuration interface
interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
}

// Enhanced rate limiting with detailed logging
function createRateLimiter(config: RateLimitConfig) {
  return rateLimit({
    windowMs: config.windowMs,
    max: config.max,
    message: config.message || 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.call(...args),
    }),
    handler: (req: Request, res: Response) => {
      // Log rate limit events
      securityLogger.rateLimitExceeded(
        req.ip || 'unknown', 
        req.originalUrl
      );

      res.status(429).json({
        error: 'Too Many Requests',
        message: config.message || 'You have exceeded the rate limit. Please try again later.',
        retryAfter: res.getHeader('Retry-After')
      });
    }
  });
}

// Different rate limit configurations for various endpoints
export const globalRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production
  message: 'Too many global requests, please try again later'
});

export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50, // More strict rate limiting for auth routes
  message: 'Too many login attempts, please try again later'
});

export const newsletterRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 50 : 500, // Limit newsletter-related requests
  message: 'Too many newsletter requests, please try again later'
});

export const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 200 : 2000, // More generous limit for general API routes
  message: 'Too many API requests, please try again later'
});

// Middleware to dynamically adjust rate limits based on user role
export function dynamicRateLimiter(req: Request, res: Response, next: NextFunction) {
  // Example: More lenient rate limit for authenticated users
  const userRole = req.user?.role || 'guest';
  
  let limit: number;
  switch (userRole) {
    case 'admin':
      limit = 1000; // Highest limit for admins
      break;
    case 'premium':
      limit = 500; // Higher limit for premium users
      break;
    case 'standard':
      limit = 200; // Standard user limit
      break;
    default:
      limit = 50; // Most restrictive for guests
  }

  const dynamicLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: limit,
    message: `Rate limit exceeded for ${userRole} role`
  });

  dynamicLimiter(req, res, next);
}
