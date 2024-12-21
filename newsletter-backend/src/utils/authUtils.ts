import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { securityLogger } from './logger';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    securityLogger.error('Error hashing password', { error });
    throw new Error('Error hashing password');
  }
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
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
