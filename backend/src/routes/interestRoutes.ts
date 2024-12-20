import express, { Request, Response, NextFunction } from 'express';
import { InterestController } from '../controllers/interestController';
import { checkJwt } from '../middleware/checkJwt';

const router = express.Router();

// Get all interests (public route)
router.get('/interests', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InterestController.getAllInterests(req, res);
  } catch (error: unknown) {
    next(error);
  }
});

// Update user preferences (protected route)
router.post(
  '/users/:id/preferences', 
  checkJwt,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await InterestController.updateUserPreferences(req, res);
    } catch (error: unknown) {
      next(error);
    }
  }
);

// Get interest wizard questions (public route)
router.get('/interests/wizard', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InterestController.getInterestWizardQuestions(req, res);
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
