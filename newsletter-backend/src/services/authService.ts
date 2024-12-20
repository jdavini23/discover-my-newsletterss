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
  static async requestPasswordReset(email: string): Promise<boolean> {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new Error('User not found');
      }

      // Delete any existing reset tokens for this user
      await PasswordResetToken.deleteMany({ 
        userId: user._id, 
        isUsed: false 
      });

      // Generate a new reset token
      const resetToken = PasswordResetToken.generateToken(user._id);
      
      // Create and save the reset token document
      const passwordResetToken = new PasswordResetToken({
        userId: user._id,
        token: resetToken,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        isUsed: false
      });
      
      await passwordResetToken.save();

      // Send reset email
      await sendPasswordResetEmail(
        user.email, 
        `http://localhost:3000/reset-password?token=${resetToken}`
      );

      return true;
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw error;
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
        token, 
        isUsed: false,
        expiresAt: { $gt: new Date() }
      }).session(session);

      if (!resetTokenDoc) {
        throw new Error('Invalid or expired reset token');
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
};
