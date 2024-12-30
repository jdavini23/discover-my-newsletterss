import * as crypto from 'crypto';
import { User } from '../models/User';
import { SecurityEvent } from '../models/SecurityEvent';
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
  userId?: string;
}

interface AdminUserCreationData extends UserCreationData {
  adminSecret: string;
}

interface UserValidationData {
  email: string;
  password: string;
}

export class UserService {
  private db = admin.firestore();
  private usersCollection = this.db.collection('users');
  private securityEventsCollection = this.db.collection('security_events');

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const userRef = await this.usersCollection.where('email', '==', email).get();
      if (userRef.empty) {
        return null;
      }
      const userData = userRef.docs[0].data();
      return new User(userData);
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error finding user by email', { errorMessage: error.message, email });
      } else {
        securityLogger.error('Unknown error finding user by email', { email });
      }
      throw new UserNotFoundError(`User with email ${email} not found`);
    }
  }

  async findUserByRole(role: string): Promise<User | null> {
    try {
      const userRef = await this.usersCollection.where('role', '==', role).get();
      if (userRef.empty) {
        return null;
      }
      const userData = userRef.docs[0].data();
      return new User(userData);
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error finding user by role', { errorMessage: error.message, role });
      } else {
        securityLogger.error('Unknown error finding user by role', { role });
      }
      throw error;
    }
  }

  async createUser(userData: UserCreationData): Promise<User> {
    try {
      const userRecord = await admin.auth().createUser({
        email: userData.email,
        password: userData.password,
      });

      const user = new User({
        email: userData.email,
        role: userData.role,
        name: userData.name || '',
        firebaseUid: userRecord.uid,
      });

      await this.usersCollection.add(user);
      await this.logSecurityEvent({ eventType: 'USER_CREATED', userId: user.id });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error creating user', { errorMessage: error.message, email: userData.email });
      } else {
        securityLogger.error('Unknown error creating user', { email: userData.email });
      }
      throw error;
    }
  }

  async createAdminUser(adminUserData: AdminUserCreationData): Promise<User> {
    try {
      if (adminUserData.adminSecret !== process.env.ADMIN_SECRET) {
        throw new AdminSecretError('Invalid admin secret');
      }

      const adminUser = await this.createUser({
        email: adminUserData.email,
        password: adminUserData.password,
        role: 'admin',
        name: adminUserData.name,
      });

      await this.logSecurityEvent({ eventType: 'ADMIN_USER_CREATED', userId: adminUser.id });

      return adminUser;
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error creating admin user', { errorMessage: error.message, email: adminUserData.email });
      } else {
        securityLogger.error('Unknown error creating admin user', { email: adminUserData.email });
      }
      throw error;
    }
  }

  async validateUser(validationData: UserValidationData): Promise<User> {
    try {
      const userRef = await this.usersCollection.where('email', '==', validationData.email).get();
      if (userRef.empty) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      const user = new User(userRef.docs[0].data());
      await admin.auth().signInWithEmailAndPassword(validationData.email, validationData.password);

      await this.logSecurityEvent({ eventType: 'SUCCESSFUL_LOGIN', userId: user.id });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error validating user', { errorMessage: error.message, email: validationData.email });
      } else {
        securityLogger.error('Unknown error validating user', { email: validationData.email });
      }
      throw error;
    }
  }

  async initiatePasswordReset(email: string): Promise<void> {
    try {
      const userRef = await this.usersCollection.where('email', '==', email).get();
      if (userRef.empty) {
        throw new UserNotFoundError('User not found');
      }

      const user = new User(userRef.docs[0].data());
      const resetToken = crypto.randomBytes(16).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      user.passwordResetToken = resetToken;
      user.passwordResetExpires = resetExpires;
      await this.usersCollection.doc(userRef.docs[0].id).update(user);

      await this.logSecurityEvent({ eventType: 'PASSWORD_RESET_INITIATED', userId: user.id });
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error initiating password reset', { errorMessage: error.message, email });
      } else {
        securityLogger.error('Unknown error initiating password reset', { email });
      }
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const userRef = await this.usersCollection.where('passwordResetToken', '==', token).get();
    if (userRef.empty) {
      return false;
    }

    const user = new User(userRef.docs[0].data());
    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      return false;
    }

    await admin.auth().updateUser(user.firebaseUid, {
      password: newPassword,
    });

    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await this.usersCollection.doc(userRef.docs[0].id).update(user);

    await this.logSecurityEvent({ eventType: 'PASSWORD_RESET_COMPLETED', userId: user.id });
    return true;
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const userRef = await this.usersCollection.where('emailVerificationToken', '==', token).get();
      if (userRef.empty) {
        throw new UserNotFoundError('Invalid verification token');
      }

      const user = new User(userRef.docs[0].data());
      user.isEmailVerified = true;
      user.emailVerificationToken = null;
      await this.usersCollection.doc(userRef.docs[0].id).update(user);

      await this.logSecurityEvent({ eventType: 'EMAIL_VERIFIED', userId: user.id });
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error verifying email', { errorMessage: error.message });
      } else {
        securityLogger.error('Unknown error verifying email');
      }
      throw error;
    }
  }

  async logSecurityEvent(options: SecurityEventOptions): Promise<void> {
    try {
      const securityEvent = new SecurityEvent();
      securityEvent.eventType = options.eventType;
      securityEvent.userId = options.userId;

      await this.securityEventsCollection.add(securityEvent);
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error logging security event', { errorMessage: error.message, eventType: options.eventType });
      } else {
        securityLogger.error('Unknown error logging security event', { eventType: options.eventType });
      }
    }
  }

  async promoteToAdmin(userId: string, promoterUserId: string): Promise<User> {
    try {
      const userRef = await this.usersCollection.doc(userId).get();
      if (!userRef.exists) {
        throw new UserNotFoundError('User not found');
      }

      const user = new User(userRef.data());
      const promoterRef = await this.usersCollection.doc(promoterUserId).get();
      if (!promoterRef.exists || promoterRef.data().role !== 'admin') {
        throw new Error('Unauthorized: Only admins can promote users to admin role');
      }

      user.role = 'admin';
      await this.usersCollection.doc(userId).update(user);

      await this.logSecurityEvent({ eventType: 'USER_PROMOTED_TO_ADMIN', userId: user.id });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        securityLogger.error('Error promoting user to admin', { errorMessage: error.message, userId });
      } else {
        securityLogger.error('Unknown error promoting user to admin', { userId });
      }
      throw error;
    }
  }
}

// Export custom error types for potential use in error handling
export { UserNotFoundError, InvalidCredentialsError, AdminSecretError };
