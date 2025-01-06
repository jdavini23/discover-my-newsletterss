import { z } from 'zod';

// Security-related utility functions and schemas

/**
 * Password strength validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[!@#$%^&*()]/, { message: 'Password must contain at least one special character' });

/**
 * Email validation schema
 */
export const emailSchema = z.string().email({ message: 'Invalid email address' });

/**
 * Check if a password meets security requirements
 * @param password - The password to validate
 * @returns Validation result
 */
export function validatePassword(password: string): boolean {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if an email is valid
 * @param email - The email to validate
 * @returns Validation result
 */
export function validateEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate a secure random password
 * @param length - Length of the password (default: 16)
 * @returns A randomly generated password
 */
export function generateSecurePassword(length: number = 16): string {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

  const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  // Ensure at least one character from each required set
  const password = [
    getRandomChar(uppercaseChars),
    getRandomChar(lowercaseChars),
    getRandomChar(numberChars),
    getRandomChar(specialChars),
  ];

  // Fill the rest with random characters
  while (password.length < length) {
    password.push(getRandomChar(allChars));
  }

  // Shuffle the password
  return password.sort(() => Math.random() - 0.5).join('');
}

/**
 * Simulate a security token generation
 * @param userId - User identifier
 * @returns A mock security token
 */
export function generateSecurityToken(userId: string): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2);
  return `${userId}-${timestamp}-${randomPart}`;
}

/**
 * Check if a security token is valid
 * @param token - Security token to validate
 * @param maxAgeMs - Maximum token age in milliseconds (default: 1 hour)
 * @returns Token validity status
 */
export function validateSecurityToken(
  token: string,
  maxAgeMs: number = 3600000 // 1 hour
): boolean {
  try {
    const [userId, timestampStr] = token.split('-');
    const timestamp = parseInt(timestampStr, 10);

    // Check if token is not too old
    const currentTime = Date.now();
    return currentTime - timestamp <= maxAgeMs;
  } catch {
    return false;
  }
}

/**
 * Security risk assessment for user activities
 * @param activities - List of recent user activities
 * @returns Security risk level
 */
export function assessSecurityRisk(activities: string[]): 'low' | 'medium' | 'high' {
  const riskFactors = activities.filter(
    (activity) =>
      activity.includes('login') ||
      activity.includes('password change') ||
      activity.includes('device')
  ).length;

  if (riskFactors <= 1) return 'low';
  if (riskFactors <= 3) return 'medium';
  return 'high';
}
