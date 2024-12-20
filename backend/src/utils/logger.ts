import winston from 'winston';
import path from 'path';

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create a logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'newsletter-discovery-service' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // File transport for error logs
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/error.log'), 
      level: 'error' 
    }),
    
    // File transport for combined logs
    new winston.transports.File({ 
      filename: path.join(__dirname, '../../logs/combined.log') 
    })
  ]
});

// Security event logging
export const securityLogger = {
  // Log security-related events
  authAttempt: (ip: string, userId: string, success: boolean) => {
    logger.info({
      message: 'Authentication Attempt',
      meta: {
        type: 'auth',
        ip,
        userId,
        success
      }
    });
  },

  // Log potential security threats
  securityThreat: (type: string, details: any) => {
    logger.warn({
      message: 'Security Threat Detected',
      meta: {
        type,
        ...details
      }
    });
  },

  // Log rate limiting events
  rateLimitExceeded: (ip: string, route: string) => {
    logger.warn({
      message: 'Rate Limit Exceeded',
      meta: {
        type: 'rate_limit',
        ip,
        route
      }
    });
  },

  // Log CSRF token validation failures
  csrfFailure: (ip: string, route: string) => {
    logger.error({
      message: 'CSRF Token Validation Failed',
      meta: {
        type: 'csrf_failure',
        ip,
        route
      }
    });
  }
};

export default logger;
