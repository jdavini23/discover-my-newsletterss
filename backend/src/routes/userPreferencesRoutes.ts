import express from 'express';
import { UserPreferencesController } from '../controllers/userPreferencesController';
import { authMiddleware } from '../middleware/authMiddleware';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
const userPreferencesController = new UserPreferencesController();

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// Update user preferences
router.put('/preferences', authMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await userPreferencesController.updateUserPreferences(req as any, res);
  } catch (error) {
    next(error);
  }
});

// Get user preferences
router.get('/preferences', authMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await userPreferencesController.getUserPreferences(req as any, res);
  } catch (error) {
    next(error);
  }
});

export default router;