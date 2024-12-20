import { ___Request, ___Response, ___NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const _checkJwt = async (): void {
  // For now, we'll create a mock middleware that always allows access
  // In a real application, this would verify the JWT token
  console.log('JWT middleware called (mock implementation)');
  next();

  // Uncomment and modify the following for actual JWT verification:
  /*
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    // @ts-ignore
    req._user = decoded;
    next();
  } catch (_error: unknown) {
    res.status(401).json({ message: 'Token is not valid' });
  }
  */
};
