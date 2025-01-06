import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IPasswordResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  hashedToken: string;
  salt: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
}

const PasswordResetTokenSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hashedToken: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800 // 30 minutes in seconds
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  }
});

// Static method to generate a secure reset token with salting
PasswordResetTokenSchema.statics.generateToken = function(userId: mongoose.Types.ObjectId): { 
  token: string; 
  hashedToken: string; 
  salt: string 
} {
  // Generate a cryptographically secure random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Create a unique salt for this token
  const salt = crypto.randomBytes(16).toString('hex');
  
  // Hash the token with the salt
  const hashedToken = crypto.pbkdf2Sync(
    token, 
    salt, 
    10000,  // iterations
    64,     // key length
    'sha512'// digest algorithm
  ).toString('hex');

  return { token, hashedToken, salt };
};

// Method to verify a token
PasswordResetTokenSchema.methods.verifyToken = function(token: string): boolean {
  // Hash the provided token with the stored salt
  const hashedAttempt = crypto.pbkdf2Sync(
    token, 
    this.salt, 
    10000, 
    64, 
    'sha512'
  ).toString('hex');

  // Compare the hashed attempt with the stored hashed token
  return hashedAttempt === this.hashedToken;
};

// Compound index for efficient querying
PasswordResetTokenSchema.index({ userId: 1, hashedToken: 1, isUsed: 1 });

export const PasswordResetToken = mongoose.model<IPasswordResetToken>('PasswordResetToken', PasswordResetTokenSchema);
