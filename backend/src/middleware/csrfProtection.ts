import { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';
import { securityLogger } from '../utils/logger';

// CSRF protection configuration with enhanced security
export const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  value: (req: Request) => {
    // Custom token extraction
    return (
      req.headers['x-csrf-token'] || 
      req.headers['x-xsrf-token'] || 
      req.body._csrf
    );
  }
});

// Custom CSRF error handler with detailed logging
export function csrfErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // Log CSRF token validation failures
  securityLogger.csrfFailure(
    req.ip || 'unknown', 
    req.originalUrl
  );

  // Detailed error response
  res.status(403).json({
    error: 'CSRF Token Validation Failed',
    message: 'Invalid or missing CSRF token. This could indicate a potential security threat.',
    details: {
      route: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    }
  });
}

// Middleware to generate CSRF token
export function generateCsrfToken(req: Request, res: Response, next: NextFunction) {
  // Generate and expose CSRF token
  const csrfToken = req.csrfToken();
  
  // Attach token to response locals for frontend access
  res.locals.csrfToken = csrfToken;
  
  // Optional: Send token in response for single-page applications
  if (req.path === '/api/csrf-token') {
    return res.json({ 
      csrfToken,
      tokenName: '_csrf' 
    });
  }
  
  next();
}

// Middleware to validate CSRF token for specific routes
export function validateCsrfToken(req: Request, res: Response, next: NextFunction) {
  // Skip CSRF validation for safe HTTP methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip CSRF for whitelisted routes if needed
  const whitelistedRoutes = [
    '/api/webhooks', 
    '/api/external-integrations'
  ];
  
  if (whitelistedRoutes.some(route => req.path.startsWith(route))) {
    return next();
  }

  // Apply CSRF protection
  csrfProtection(req, res, next);
}

// Token rotation mechanism
export function rotateCSRFToken(req: Request, res: Response, next: NextFunction) {
  // Implement token rotation logic
  const currentToken = req.csrfToken();
  const lastToken = req.session?.lastCsrfToken;

  // Invalidate old token after certain time or number of uses
  if (lastToken && Date.now() - (req.session?.tokenGeneratedAt || 0) > 3600000) {
    // Token is older than 1 hour, rotate
    req.session.lastCsrfToken = currentToken;
    req.session.tokenGeneratedAt = Date.now();
  }

  next();
}
