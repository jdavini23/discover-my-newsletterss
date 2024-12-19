import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { redisClient } from '../config/redis';

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export class RecommendationController {
  private userRepository = AppDataSource.getRepository(User);
  private newsletterRepository = AppDataSource.getRepository(Newsletter);
  private interestRepository = AppDataSource.getRepository(Interest);

  // Get personalized newsletter recommendations
  async getPersonalizedRecommendations(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { page = 1, limit = 10 } = req.query;

      // Check cache first
      const cacheKey = `recommendations:newsletters:${userId}:page:${page}:limit:${limit}`;
      const cachedRecommendations = await redisClient.get(cacheKey);
      
      if (cachedRecommendations) {
        return res.json(JSON.parse(cachedRecommendations));
      }

      // Find user with their preferences
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['preferences']
      });

      if (!user || !user.preferences || user.preferences.length === 0) {
        return res.status(200).json({ 
          newsletters: [], 
          message: 'No preferences set for personalized recommendations' 
        });
      }

      // Get user's interest IDs
      const interestIds = user.preferences.map(interest => interest.id);

      // Build recommendation query
      const queryBuilder = this.newsletterRepository.createQueryBuilder('newsletter')
        .leftJoinAndSelect('newsletter.interests', 'interests')
        .where('interests.id IN (:...interestIds)', { interestIds })
        .orderBy('newsletter.averageRating', 'DESC')
        .skip((Number(page) - 1) * Number(limit))
        .take(Number(limit));

      const [newsletters, total] = await queryBuilder.getManyAndCount();

      const result = {
        newsletters,
        page: Number(page),
        limit: Number(limit),
        total,
        matchedInterests: user.preferences
      };

      // Cache recommendations for 1 hour
      await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);

      res.json(result);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      res.status(500).json({ error: 'Failed to generate recommendations' });
    }
  }

  // Get recommended interests based on existing newsletters
  async getRecommendedInterests(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { limit = 5 } = req.query;

      // Check cache first
      const cacheKey = `recommendations:interests:${userId}:limit:${limit}`;
      const cachedInterests = await redisClient.get(cacheKey);
      
      if (cachedInterests) {
        return res.json(JSON.parse(cachedInterests));
      }

      // Find user with their current preferences
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['preferences']
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Get current interest IDs
      const currentInterestIds = user.preferences.map(interest => interest.id);

      // Find related interests based on newsletter topics
      const relatedInterests = await this.interestRepository.createQueryBuilder('interest')
        .leftJoin('interest.newsletters', 'newsletter')
        .where('newsletter.id IS NOT NULL')
        .andWhere('interest.id NOT IN (:...currentInterestIds)', { currentInterestIds })
        .groupBy('interest.id')
        .orderBy('COUNT(newsletter.id)', 'DESC')
        .limit(Number(limit))
        .getMany();

      const result = { 
        recommendedInterests: relatedInterests,
        currentInterests: user.preferences
      };

      // Cache recommendations for 1 hour
      await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);

      res.json(result);
    } catch (error) {
      console.error('Error finding recommended interests:', error);
      res.status(500).json({ error: 'Failed to find recommended interests' });
    }
  }
}
