import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { redisClient } from '../config/redis';
import { asyncHandler } from '../middleware/errorHandler';
import { NotFoundError } from '../utils/customErrors';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string };
}

interface RecommendationQuery {
  page?: number;
  limit?: number;
}

interface RecommendationResult {
  newsletters: Newsletter[];
  page: number;
  limit: number;
  total: number;
  matchedInterests?: Interest[];
}

interface RecommendedInterestsResult {
  recommendedInterests: Interest[];
  currentInterests: Interest[];
}

export class RecommendationController {
  private userRepository = AppDataSource.getRepository(User);
  private newsletterRepository = AppDataSource.getRepository(Newsletter);
  private interestRepository = AppDataSource.getRepository(Interest);

  private generateCacheKey(
    type: 'newsletters' | 'interests', 
    userId: string, 
    options: RecommendationQuery
  ): string {
    const { page = 1, limit = 10 } = options;
    return `recommendations:${type}:${userId}:page:${page}:limit:${limit}`;
  }

  private parseQueryParams(query: RecommendationQuery): { page: number; limit: number } {
    return {
      page: Math.max(1, Number(query.page || 1)),
      limit: Math.min(100, Math.max(1, Number(query.limit || 10)))
    };
  }

  private async findUserWithPreferences(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId }, 
      relations: ['preferences'] 
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  }

  getPersonalizedRecommendations = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { page, limit } = this.parseQueryParams(req.query);
      const cacheKey = this.generateCacheKey('newsletters', userId, { page, limit });

      // Check cache first
      const cachedRecommendations = await redisClient.get(cacheKey);
      if (cachedRecommendations) {
        return res.json(JSON.parse(cachedRecommendations));
      }

      const user = await this.findUserWithPreferences(userId);

      // If no preferences, return empty recommendations
      if (!user.preferences?.length) {
        return res.status(200).json({ 
          newsletters: [], 
          message: 'No preferences set for personalized recommendations' 
        });
      }

      const interestIds = user.preferences.map(interest => interest.id);
      const queryBuilder = this.newsletterRepository
        .createQueryBuilder('newsletter')
        .leftJoinAndSelect('newsletter.interests', 'interests')
        .where('interests.id IN (:...interestIds)', { interestIds })
        .orderBy('newsletter.averageRating', 'DESC')
        .skip((page - 1) * limit)
        .take(limit);

      const [newsletters, total] = await queryBuilder.getManyAndCount();

      const result: RecommendationResult = {
        newsletters,
        page,
        limit,
        total,
        matchedInterests: user.preferences,
      };

      // Cache the result
      await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);

      return res.json(result);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(500).json({
        message: 'Error fetching personalized recommendations',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  getRecommendedInterests = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { limit } = this.parseQueryParams(req.query);
      const cacheKey = this.generateCacheKey('interests', userId, { limit });

      // Check cache first
      const cachedInterests = await redisClient.get(cacheKey);
      if (cachedInterests) {
        return res.json(JSON.parse(cachedInterests));
      }

      const user = await this.findUserWithPreferences(userId);

      const currentInterestIds = user.preferences.map(interest => interest.id);
      const relatedInterests = await this.interestRepository
        .createQueryBuilder('interest')
        .leftJoin('interest.newsletters', 'newsletter')
        .where('newsletter.id IS NOT NULL')
        .andWhere('interest.id NOT IN (:...currentInterestIds)', { currentInterestIds })
        .groupBy('interest.id')
        .orderBy('COUNT(newsletter.id)', 'DESC')
        .limit(limit)
        .getMany();

      const result: RecommendedInterestsResult = {
        recommendedInterests: relatedInterests,
        currentInterests: user.preferences,
      };

      // Cache the result
      await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);

      return res.json(result);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(500).json({
        message: 'Error fetching recommended interests',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
