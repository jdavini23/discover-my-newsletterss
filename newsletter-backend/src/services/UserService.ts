import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
import { hashPassword, comparePasswords, generateRandomToken } from '../utils/authUtils';
import { securityLogger } from '../utils/logger';

export class UserService {
  private userRepository = getRepository(User);
  private securityEventRepository = getRepository(SecurityEvent);

  async createUser(email: string, password: string, name: string): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await hashPassword(password);
      const emailVerificationToken = generateRandomToken();

      const user = this.userRepository.create({
        email,
        passwordHash: hashedPassword,
        name,
        emailVerificationToken,
        isEmailVerified: false
      });

      await this.userRepository.save(user);
      await this.logSecurityEvent('USER_CREATED', user.id);

      return user;
    } catch (error) {
      securityLogger.error('Error creating user', { error, email });
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user || !user.passwordHash) {
        throw new Error('Invalid credentials');
      }

      const isValid = await comparePasswords(password, user.passwordHash);
      if (!isValid) {
        await this.logSecurityEvent('FAILED_LOGIN_ATTEMPT', user.id);
        throw new Error('Invalid credentials');
      }

      await this.logSecurityEvent('SUCCESSFUL_LOGIN', user.id);
      return user;
    } catch (error) {
      securityLogger.error('Error validating user', { error, email });
      throw error;
    }
  }

  async initiatePasswordReset(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const resetToken = generateRandomToken();
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      user.passwordResetToken = resetToken;
      user.passwordResetExpires = resetExpires;
      await this.userRepository.save(user);

      await this.logSecurityEvent('PASSWORD_RESET_INITIATED', user.id);
    } catch (error) {
      securityLogger.error('Error initiating password reset', { error, email });
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ 
        where: { 
          passwordResetToken: token,
          passwordResetExpires: new Date() 
        }
      });

      if (!user) {
        throw new Error('Invalid or expired reset token');
      }

      user.passwordHash = await hashPassword(newPassword);
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await this.userRepository.save(user);

      await this.logSecurityEvent('PASSWORD_RESET_COMPLETED', user.id);
    } catch (error) {
      securityLogger.error('Error resetting password', { error });
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ 
        where: { emailVerificationToken: token } 
      });

      if (!user) {
        throw new Error('Invalid verification token');
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = null;
      await this.userRepository.save(user);

      await this.logSecurityEvent('EMAIL_VERIFIED', user.id);
    } catch (error) {
      securityLogger.error('Error verifying email', { error });
      throw error;
    }
  }

  private async logSecurityEvent(
    eventType: string, 
    userId: string, 
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const event = this.securityEventRepository.create({
        eventType,
        userId,
        ipAddress: '0.0.0.0', // This should be passed from the request
        metadata,
        isHighRisk: eventType.includes('FAILED') || eventType.includes('RESET')
      });

      await this.securityEventRepository.save(event);
      securityLogger.info('Security event logged', { eventType, userId });
    } catch (error) {
      securityLogger.error('Error logging security event', { error, eventType, userId });
    }
  }
}
