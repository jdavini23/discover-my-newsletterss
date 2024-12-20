import express, { Request, Response, NextFunction } from 'express';
import { UserPreferencesController } from '../controllers/userPreferencesController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const userPreferencesController = new UserPreferencesController();

// Update user preferences handler
const updatePreferences = (req: Request, res: Response, next: NextFunction) => {
  userPreferencesController.updateUserPreferences(req, res).catch(next);
};

// Get user preferences handler
const getPreferences = (req: Request, res: Response, next: NextFunction) => {
  userPreferencesController.getUserPreferences(req, res).catch(next);
};

// Routes
router.put('/preferences', [authMiddleware, updatePreferences]);
router.get('/preferences', [authMiddleware, getPreferences]);

export default router;
