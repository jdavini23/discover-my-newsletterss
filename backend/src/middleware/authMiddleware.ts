import { Request, Response, __NextFunction } from 'express';
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
export const _authMiddleware = (_req: Request, _res: Response, _next: NextFunction): void => {
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

    req.user = decoded;
    next();
  } catch (_error: unknown) {
    res.status(401).json({ 
      error: 'Authentication failed', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Admin-specific middleware with explicit return type
export const _adminMiddleware = (_req: Request, _res: Response, _next: NextFunction): void => {
  if (!req.user) {
    res.status(403).json({ error: 'Access denied. Authentication required.' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Access denied. Admin rights required.' });
    return;
  }

  next();
};

// Role-based authorization middleware
export const _roleMiddleware = async (__req: Request, __res: Response): Promise<void> => {
  if (!req.user) {
    res.status(403).json({ error: 'Access denied. Authentication required.' });
    return;
  }

  if (!req.user.role || !allowedRoles.includes(req.user.role)) {
    res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    return;
  }

  next();
};

// Utility function to extract user ID from request
export const _getUserIdFromRequest = (req: AuthenticatedRequest): string | null => {
  return req.user?.id ?? null;
};
