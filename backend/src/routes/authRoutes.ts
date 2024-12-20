import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const userService = new UserService();

// User Registration
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, preferences } = req.body;
  userService.registerUser(email, password, firstName, lastName, preferences)
    .then(({ user, token }) => {
      const userResponse = {
        ...user,
        email: email,
        isEmailVerified: false,
      };
      res.status(201).json({ user: userResponse, token, message: 'User registered successfully' });
    })
    .catch(next);
});

// User Login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userService.loginUser(email, password)
    .then(result => res.json(result))
    .catch(next);
});

// Initiate Password Reset
router.post('/forgot-password', (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  console.log('Initiating Password Reset for Email:', email);
  userService.initiatePasswordReset(email)
    .then(resetToken => {
      res.status(200).json({
        message: 'Password reset token generated',
        resetToken
      });
    })
    .catch(next);
});

// Reset Password
router.post('/reset-password', (req: Request, res: Response, next: NextFunction) => {
  const { token, newPassword } = req.body;
  console.log('Reset Password Request:', { token, newPassword });
  userService.resetPassword(token, newPassword)
    .then(() => res.json({ message: 'Password has been reset' }))
    .catch(next);
});

// Update User Preferences (Protected Route)
const updatePreferences = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.id;
  const { preferences } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  userService.updateUserPreferences(userId, preferences)
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
};

router.put('/preferences', [authMiddleware, updatePreferences]);

export default router;
