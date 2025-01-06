import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import hpp from 'hpp';
import validator from 'validator';
import xss from 'xss';
import { securityLogger } from '../utils/logger';
import crypto from 'crypto';

// Sanitize and validate input middleware
export function inputValidation(req: Request, res: Response, next: NextFunction) {
  const sanitizeInput = (input: any): any => {
    if (typeof input === 'string') {
      // Trim whitespace
      input = input.trim();
      
      // Escape HTML to prevent XSS
      input = xss(input);
      
      // Validate and sanitize specific types of input
      if (validator.isEmail(input)) {
        return validator.normalizeEmail(input);
      }
      
      if (validator.isAlphanumeric(input)) {
        return input;
      }
      
      // Escape potentially dangerous characters
      return validator.escape(input);
    }
    
    if (Array.isArray(input)) {
      return input.map(sanitizeInput);
    }
    
    if (typeof input === 'object' && input !== null) {
      return Object.keys(input).reduce((acc, key) => {
        acc[key] = sanitizeInput(input[key]);
        return acc;
      }, {});
    }
    
    return input;
  };

  // Sanitize request body, query, and params
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);

  next();
}

// Comprehensive security middleware configuration
export const securityHeaders = helmet({
  // Content Security Policy (CSP)
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        'https://trusted-cdn.com',
        (req, res) => `'nonce-${res.locals.cspNonce}'`
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.example.com'],
      frameSrc: ["'none'"],
      reportUri: '/csp-report-endpoint'
    }
  },

  // Referrer Policy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },

  // HTTP Strict Transport Security (HSTS)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },

  // X-Frame-Options
  frameguard: {
    action: 'deny'
  },

  // Hide Powered-By header
  hidePoweredBy: {
    setTo: 'PHP 7.4.3' // Misleading server information
  },

  // X-XSS-Protection
  xssFilter: true,

  // Prevent MIME type sniffing
  noSniff: true,

  // Expect-CT header
  expectCt: {
    enforce: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
});

// CORS configuration with enhanced security
export const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://yourdomain.com',
      'https://www.yourdomain.com',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log potential CORS violation
      securityLogger.securityThreat('cors_violation', { origin });
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'X-CSRF-Token'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Error handling middleware
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  
  // Differentiate between operational and programming errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Failed',
      message: err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
  }
  
  // Generic server error for unexpected issues
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end'
  });
}

// Comprehensive security middleware
export const securityMiddleware = (app: express.Application) => {
  // Input validation middleware
  app.use(inputValidation);

  // Generate CSP nonce for inline scripts
  app.use((req, res, next) => {
    res.locals.cspNonce = Buffer.from(crypto.randomBytes(16)).toString('base64');
    next();
  });

  // Apply security headers
  app.use(securityHeaders);

  // CORS configuration
  app.use(cors(corsOptions));

  // Prevent HTTP Parameter Pollution
  app.use(hpp({
    whitelist: [
      'fields', // Example of allowed duplicate parameters
      'include'
    ]
  }));

  // Rate limiting to prevent brute-force attacks
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
  });
  app.use(limiter);

  // Error handling middleware
  app.use(errorHandler);
};
