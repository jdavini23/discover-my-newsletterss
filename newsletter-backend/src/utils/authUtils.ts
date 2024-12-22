import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { securityLogger } from './logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  } catch (error) {
    securityLogger.error('Error hashing password', { error });
    throw new Error('Error hashing password');
  }
};

export const comparePasswords = async (password: string, storedPassword: string): Promise<boolean> => {
  try {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
  } catch (error) {
    securityLogger.error('Error comparing passwords', { error });
    throw new Error('Error comparing passwords');
  }
};

export const generateToken = (userId: string): string => {
  try {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
  } catch (error) {
    securityLogger.error('Error generating JWT token', { error, userId });
    throw new Error('Error generating token');
  }
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    securityLogger.error('Error verifying JWT token', { error });
    throw new Error('Invalid token');
  }
};

export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
