import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';
import speakeasy from 'speakeasy';

export enum MFAMethod {
  TOTP = 'totp',
  SMS = 'sms',
  EMAIL = 'email'
}

export interface IMultiFactorAuth extends Document {
  userId: mongoose.Types.ObjectId;
  method: MFAMethod;
  secret?: string;
  phoneNumber?: string;
  isEnabled: boolean;
  backupCodes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MultiFactorAuthSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  method: {
    type: String,
    enum: Object.values(MFAMethod),
    required: true
  },
  secret: {
    type: String,
    select: false
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v: string) {
        return this.method === MFAMethod.SMS ? /^\+[1-9]\d{1,14}$/.test(v) : true;
      },
      message: 'Invalid phone number format'
    }
  },
  isEnabled: {
    type: Boolean,
    default: false
  },
  backupCodes: [{
    type: String,
    select: false
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Static method to generate TOTP secret
MultiFactorAuthSchema.statics.generateTOTPSecret = function(): { base32: string; otpAuthUrl: string } {
  return speakeasy.generateSecret({ name: "Newsletter App" });
};

// Static method to generate backup codes
MultiFactorAuthSchema.statics.generateBackupCodes = function(count: number = 5): string[] {
  return Array.from({ length: count }, () => 
    crypto.randomBytes(4).toString('hex').toUpperCase()
  );
};

// Method to verify TOTP token
MultiFactorAuthSchema.methods.verifyTOTPToken = function(token: string): boolean {
  if (!this.secret) {
    throw new Error('MFA secret not set');
  }

  return speakeasy.totp.verify({
    secret: this.secret,
    encoding: 'base32',
    token: token
  });
};

// Method to verify backup code
MultiFactorAuthSchema.methods.verifyBackupCode = function(code: string): boolean {
  const index = this.backupCodes.indexOf(code);
  if (index !== -1) {
    // Remove the used backup code
    this.backupCodes.splice(index, 1);
    return true;
  }
  return false;
};

export const MultiFactorAuth = mongoose.model<IMultiFactorAuth>('MultiFactorAuth', MultiFactorAuthSchema);
