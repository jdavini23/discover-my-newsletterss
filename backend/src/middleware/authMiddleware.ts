import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

// Decoded token interface
export interface DecodedToken {
  id: string;
  email: string;
  role?: string;
}

// Extended request interface for authenticated routes
export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

// Authentication middleware with explicit return type
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;

    if (!decoded) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error: unknown) {
    res.status(401).json({ 
      error: 'Authentication failed', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Admin-specific middleware with explicit return type
export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user) {
    res.status(403).json({ error: 'Access denied. Authentication required.' });
    return;
  }

  if (authReq.user.role !== 'admin') {
    res.status(403).json({ error: 'Access denied. Admin rights required.' });
    return;
  }

  next();
};

// Role-based authorization middleware
export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      res.status(403).json({ error: 'Access denied. Authentication required.' });
      return;
    }

    if (!authReq.user.role || !roles.includes(authReq.user.role)) {
      res.status(403).json({ error: 'Access denied. Required role not found.' });
      return;
    }

    next();
  };
};

// Utility function to extract user ID from request
export const getUserIdFromRequest = (req: AuthenticatedRequest): string | null => {
  return req.user?.id || null;
};
