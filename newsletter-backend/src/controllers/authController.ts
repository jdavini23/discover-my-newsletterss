import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  /**
   * Request password reset
   */
  static async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ 
          message: 'Email is required',
          code: 'EMAIL_REQUIRED'
        });
        return;
      }

      await AuthService.requestPasswordReset(email);

      res.status(200).json({ 
        message: 'Password reset link sent successfully',
        code: 'RESET_LINK_SENT'
      });
    } catch (error) {
      console.error('Password reset request error:', error);

      if (error instanceof Error) {
        switch (error.message) {
          case 'User not found':
            res.status(404).json({ 
              message: 'No account associated with this email',
              code: 'USER_NOT_FOUND'
            });
            break;
          default:
            res.status(500).json({ 
              message: 'Failed to process password reset request',
              code: 'RESET_REQUEST_FAILED'
            });
        }
      } else {
        res.status(500).json({ 
          message: 'An unexpected error occurred',
          code: 'UNEXPECTED_ERROR'
        });
      }
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        res.status(400).json({ 
          message: 'Token and new password are required',
          code: 'INVALID_INPUT'
        });
        return;
      }

      await AuthService.resetPassword(token, newPassword);

      res.status(200).json({ 
        message: 'Password reset successfully',
        code: 'PASSWORD_RESET_SUCCESS'
      });
    } catch (error) {
      console.error('Password reset error:', error);

      if (error instanceof Error) {
        switch (error.message) {
          case 'Invalid or expired reset token':
            res.status(400).json({ 
              message: 'Reset token is invalid or has expired',
              code: 'INVALID_TOKEN'
            });
            break;
          case 'User not found':
            res.status(404).json({ 
              message: 'Associated user account not found',
              code: 'USER_NOT_FOUND'
            });
            break;
          case 'Password must be at least 12 characters long':
            res.status(400).json({ 
              message: 'Password does not meet complexity requirements',
              code: 'PASSWORD_TOO_SHORT'
            });
            break;
          default:
            res.status(500).json({ 
              message: 'Failed to reset password',
              code: 'RESET_FAILED'
            });
        }
      } else {
        res.status(500).json({ 
          message: 'An unexpected error occurred',
          code: 'UNEXPECTED_ERROR'
        });
      }
    }
  }
}
