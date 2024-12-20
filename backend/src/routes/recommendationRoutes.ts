import { Request, Response, NextFunction } from 'express';
import { RecommendationController } from '../controllers/recommendationController';
import { authMiddleware } from '../middleware/authMiddleware';
;
;
;

const router = express.Router();
const recommendationController = new RecommendationController();

// Get personalized newsletter recommendations
router.get(
  '/newsletters',
  authMiddleware,
  validateQuery(PaginationQueryDto),
  (_____req: Request, _____res: Response, _____next: NextFunction) => {
    recommendationController.getPersonalizedRecommendations(req as any, res).catch(next);
  }
);

// Get recommended interests
router.get(
  '/interests',
  authMiddleware,
  validateQuery(PaginationQueryDto),
  (_____req: Request, _____res: Response, _____next: NextFunction) => {
    recommendationController.getRecommendedInterests(req as any, res).catch(next);
  }
);

export default router;
