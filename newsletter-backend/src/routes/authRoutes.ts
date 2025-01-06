import express from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middleware/validationMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// Password reset request route
router.post(
  '/request-password-reset', 
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail()
  ],
  validateRequest,
  AuthController.requestPasswordReset
);

// Password reset confirmation route
router.post(
  '/reset-password', 
  [
    body('token')
      .notEmpty()
      .withMessage('Reset token is required'),
    body('newPassword')
      .isLength({ min: 12 })
      .withMessage('Password must be at least 12 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)
      .withMessage('Password must include lowercase, uppercase, number, and special character')
  ],
  validateRequest,
  AuthController.resetPassword
);

export default router;
