import express from 'express';
import { RecommendationController } from '../controllers/recommendationController';
import { authMiddleware } from '../middleware/authMiddleware';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
const recommendationController = new RecommendationController();

// Get personalized newsletter recommendations
router.get('/newsletters', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  recommendationController.getPersonalizedRecommendations(req as any, res).catch(next);
});

// Get recommended interests
router.get('/interests', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  recommendationController.getRecommendedInterests(req as any, res).catch(next);
});

export default router;
