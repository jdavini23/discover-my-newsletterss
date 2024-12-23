import { MoreThan } from 'typeorm';
import * as crypto from 'crypto';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
import { AppDataSource } from '../config/database';
import { securityLogger } from '../utils/logger';
import * as admin from 'firebase-admin';

// Define custom error types for better error handling
class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

class AdminSecretError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminSecretError';
  }
}

// Define interfaces for better type safety
interface UserCreationData {
  email: string;
  password: string;
  role: string;
  name?: string;
}

interface SecurityEventOptions {
  eventType: string;
  userId?: number;
}

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private securityEventRepository = AppDataSource.getRepository(SecurityEvent);

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      await admin.auth().getUserByEmail(email);
      return await this.userRepository.findOne({ where: { email } });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return null;
      }
      securityLogger.error('Error finding user by email', { error, email });
      throw new UserNotFoundError(`User with email ${email} not found`);
    }
  }

  async findUserByRole(role: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { role } });
    } catch (error: any) {
      securityLogger.error('Error finding user by role', { error, role });
      throw error;
    }
  }

  async createUser(userData: UserCreationData): Promise<User> {
    try {
      const userRecord = await admin.auth().createUser({
        email: userData.email,
        password: userData.password,
      });

      const user =
        (await this.userRepository.findOne({ where: { email: userData.email } })) || new User();

      user.email = userData.email;
      user.role = userData.role;
      user.name = userData.name || '';
      user.firebaseUid = userRecord.uid;

      await this.userRepository.save(user);
      await this.logSecurityEvent({ eventType: 'USER_CREATED', userId: user.id });

      return user;
    } catch (error: any) {
      securityLogger.error('Error creating user', { error, email: userData.email });
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
        throw new AdminSecretError('Invalid admin secret');
      }

      const adminUser = await this.createUser({
        email,
        password,
        role: 'admin',
        name,
      });

      await this.logSecurityEvent({ eventType: 'ADMIN_USER_CREATED', userId: adminUser.id });

      return adminUser;
    } catch (error: any) {
      securityLogger.error('Error creating admin user', { error, email });
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      await admin.auth().getUserByEmail(email);
      const isValid = await admin.auth().signInWithEmailAndPassword(email, password);

      if (!isValid) {
        await this.logSecurityEvent({ eventType: 'FAILED_LOGIN_ATTEMPT', userId: user.id });
        throw new InvalidCredentialsError('Invalid credentials');
      }

      await this.logSecurityEvent({ eventType: 'SUCCESSFUL_LOGIN', userId: user.id });
      return user;
    } catch (error: any) {
      securityLogger.error('Error validating user', { error, email });
      throw error;
    }
  }

  async initiatePasswordReset(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new UserNotFoundError('User not found');
      }

      const resetToken = crypto.randomBytes(16).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      user.passwordResetToken = resetToken;
      user.passwordResetExpires = resetExpires;
      await this.userRepository.save(user);

      await this.logSecurityEvent({ eventType: 'PASSWORD_RESET_INITIATED', userId: user.id });
    } catch (error: any) {
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

    await admin.auth().updateUser(user.firebaseUid, {
      password: newPassword,
    });

    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await userRepository.save(user);

    await this.logSecurityEvent({ eventType: 'PASSWORD_RESET_COMPLETED', userId: user.id });
    return true;
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { emailVerificationToken: token },
      });

      if (!user) {
        throw new UserNotFoundError('Invalid verification token');
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = null;
      await this.userRepository.save(user);

      await this.logSecurityEvent({ eventType: 'EMAIL_VERIFIED', userId: user.id });
    } catch (error: any) {
      securityLogger.error('Error verifying email', { error });
      throw error;
    }
  }

  async logSecurityEvent(options: SecurityEventOptions): Promise<void> {
    try {
      const securityEvent = new SecurityEvent();
      securityEvent.eventType = options.eventType;
      securityEvent.userId = options.userId;

      await this.securityEventRepository.save(securityEvent);
    } catch (error: any) {
      securityLogger.error('Error logging security event', { error, eventType: options.eventType });
    }
  }

  async promoteToAdmin(userId: string, promoterUserId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UserNotFoundError('User not found');
      }

      const promoter = await this.userRepository.findOne({ where: { id: promoterUserId } });
      if (!promoter || promoter.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can promote users to admin role');
      }

      user.role = 'admin';
      await this.userRepository.save(user);

      await this.logSecurityEvent({ eventType: 'USER_PROMOTED_TO_ADMIN', userId: user.id });

      return user;
    } catch (error: any) {
      securityLogger.error('Error promoting user to admin', { error, userId });
      throw error;
    }
  }
}

// Export custom error types for potential use in error handling
export { UserNotFoundError, InvalidCredentialsError, AdminSecretError };
