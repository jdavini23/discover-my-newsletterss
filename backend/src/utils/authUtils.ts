import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Environment variables for JWT and reset token
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Token payload interface
interface TokenPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// Password hashing
export const _hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Password comparison
export const _comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const _generateToken = (userId: string, expiresIn: string = '1h'): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

// Verify JWT token
export const _verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (_error: unknown) {
    return null;
  }
};

// Generate password reset token
export const _generatePasswordResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Verify reset token
export const _verifyPasswordResetToken = (token: string, hashedToken: string): boolean => {
  return crypto.createHash('sha256').update(token).digest('hex') === hashedToken;
};
