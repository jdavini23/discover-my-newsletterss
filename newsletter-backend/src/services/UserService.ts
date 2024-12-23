import { MoreThan } from 'typeorm';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
import { hashPassword } from '../utils/authUtils';
import { AppDataSource } from '../config/database';
import crypto from 'crypto';
import { securityLogger } from '../utils/logger';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  private securityEventRepository = AppDataSource.getRepository(SecurityEvent);

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserByRole(role: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { role } });
    } catch (error) {
      securityLogger.error('Error finding user by role', { error, role });
      throw error;
    }
  }

  async createAdminUser(
    email: string,
    password: string,
    name: string,
    adminSecret: string
  ): Promise<User> {
    try {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        throw new Error('Invalid admin secret');
      }

      const hashedPassword = await hashPassword(password);

      const adminUser = new User();
      adminUser.email = email;
      adminUser.password = hashedPassword;
      adminUser.name = name;
      adminUser.role = 'admin';

      await this.logSecurityEvent('ADMIN_USER_CREATED', adminUser.id);

      return await this.userRepository.save(adminUser);
    } catch (error) {
      securityLogger.error('Error creating admin user', { error, email });
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const user = new User();
      Object.assign(user, userData);

      if (userData.password) {
        user.password = await hashPassword(userData.password);
      }

      const emailVerificationToken = crypto.randomBytes(16).toString('hex');
      user.emailVerificationToken = emailVerificationToken;
      user.isEmailVerified = false;

      await this.logSecurityEvent('USER_CREATED', user.id);

      return await this.userRepository.save(user);
    } catch (error) {
      securityLogger.error('Error creating user', { error, email: userData.email });
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user || !user.password) {
        throw new Error('Invalid credentials');
      }

      const isValid = (await hashPassword(password)) === user.password;
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

      const resetToken = crypto.randomBytes(16).toString('hex');
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

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      return false;
    }

    user.password = await hashPassword(newPassword);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await userRepository.save(user);

    await this.logSecurityEvent('PASSWORD_RESET_COMPLETED', user.id);
    return true;
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { emailVerificationToken: token },
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

  async logSecurityEvent(
    eventType: string,
    userId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const event = this.securityEventRepository.create({
        eventType,
        userId,
        ipAddress: '0.0.0.0',
        metadata,
        isHighRisk: eventType.includes('FAILED') || eventType.includes('RESET'),
      });
      await this.securityEventRepository.save(event);
    } catch (error) {
      securityLogger.error('Error logging security event', { error, eventType, userId });
      throw error;
    }
  }

  async promoteToAdmin(userId: string, promoterUserId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      const promoter = await this.userRepository.findOne({ where: { id: promoterUserId } });
      if (!promoter || promoter.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can promote users to admin role');
      }

      user.role = 'admin';
      await this.userRepository.save(user);

      await this.logSecurityEvent('USER_PROMOTED_TO_ADMIN', user.id, {
        promotedBy: promoterUserId,
      });

      return user;
    } catch (error) {
      securityLogger.error('Error promoting user to admin', { error, userId });
      throw error;
    }
  }
}
