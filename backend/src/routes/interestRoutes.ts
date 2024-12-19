import { Router } from 'express';
import { InterestController } from '../controllers/interestController';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();

// Get all interests (public route)
router.get('/interests', InterestController.getAllInterests);

// Update user preferences (protected route)
router.post('/users/:id/preferences', [checkJwt], InterestController.updateUserPreferences);

// Get interest wizard questions (public route)
router.get('/interests/wizard', InterestController.getInterestWizardQuestions);

export default router;
