import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IPasswordResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
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
  token: {
    type: String,
    required: true,
    unique: true
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

// Static method to generate a secure reset token
PasswordResetTokenSchema.statics.generateToken = function(userId: mongoose.Types.ObjectId): string {
  return crypto.randomBytes(32).toString('hex');
};

// Compound index for efficient querying
PasswordResetTokenSchema.index({ userId: 1, token: 1, isUsed: 1 });

export const PasswordResetToken = mongoose.model<IPasswordResetToken>('PasswordResetToken', PasswordResetTokenSchema);
