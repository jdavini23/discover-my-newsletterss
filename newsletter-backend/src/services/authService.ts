import { User } from '../models/User';
import { PasswordResetToken } from '../models/PasswordResetToken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '../utils/emailService';

export class AuthService {
  /**
   * Request a password reset token
   * @param email User's email address
   * @returns Promise resolving to success status
   */
  static async requestPasswordReset(email: string): Promise<string> {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();

      // Find user by email
      const user = await User.findOne({ email }).session(session);
      
      if (!user) {
        throw new Error('User not found');
      }

      // Delete any existing reset tokens for this user
      await PasswordResetToken.deleteMany({ 
        userId: user._id, 
        isUsed: false 
      }).session(session);

      // Generate a new reset token with hashing
      const { token, hashedToken, salt } = PasswordResetToken.generateToken(user._id);
      
      // Create and save the reset token document
      const passwordResetToken = new PasswordResetToken({
        userId: user._id,
        hashedToken,
        salt,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        isUsed: false
      });
      
      await passwordResetToken.save({ session });

      // Send reset email with unhashed token
      await sendPasswordResetEmail(
        user.email, 
        `http://localhost:3000/reset-password?token=${token}`
      );

      // Commit transaction
      await session.commitTransaction();

      return token;
    } catch (error) {
      // Abort transaction
      await session.abortTransaction();
      
      console.error('Password reset request failed:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Reset user password using a valid token
   * @param token Password reset token
   * @param newPassword New password to set
   * @returns Promise resolving to success status
   */
  static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();

      // Find the token and validate it
      const resetTokenDoc = await PasswordResetToken.findOne({ 
        isUsed: false,
        expiresAt: { $gt: new Date() }
      }).session(session);

      if (!resetTokenDoc) {
        throw new Error('Invalid or expired reset token');
      }

      // Verify the token using the stored salt
      if (!resetTokenDoc.verifyToken(token)) {
        throw new Error('Invalid reset token');
      }

      // Find the associated user
      const user = await User.findById(resetTokenDoc.userId).session(session);

      if (!user) {
        throw new Error('User not found');
      }

      // Validate new password complexity
      if (newPassword.length < 12) {
        throw new Error('Password must be at least 12 characters long');
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update user password
      user.password = hashedPassword;
      await user.save({ session });

      // Mark the token as used
      resetTokenDoc.isUsed = true;
      await resetTokenDoc.save({ session });

      // Commit transaction
      await session.commitTransaction();

      return true;
    } catch (error) {
      // Abort transaction
      await session.abortTransaction();
      
      console.error('Password reset failed:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
