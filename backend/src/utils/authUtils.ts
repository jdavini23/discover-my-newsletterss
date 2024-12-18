import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Environment variables for JWT and reset token
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || 'your_reset_token_secret';

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Password comparison
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (userId: string, expiresIn: string = '1h'): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

// Verify JWT token
export const verifyToken = (token: string): { id: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string };
  } catch (error) {
    return null;
  }
};

// Generate password reset token
export const generatePasswordResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash reset token
export const hashResetToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Verify reset token
export const verifyPasswordResetToken = (token: string, hashedToken: string): boolean => {
  return crypto.createHash('sha256').update(token).digest('hex') === hashedToken;
};
