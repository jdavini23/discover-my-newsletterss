import { Request, Response, NextFunction } from 'express';
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

  private getCacheExpiration(type: 'newsletters' | 'interests'): number {
    // Dynamic cache expiration based on recommendation type
    switch (type) {
      case 'newsletters':
        // Newsletters change less frequently, cache for longer
        return 24 * 60 * 60; // 24 hours
      case 'interests':
        // Interests might change more often
        return 4 * 60 * 60; // 4 hours
      default:
        return 1 * 60 * 60; // Default 1 hour
    }
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

  _getPersonalizedRecommendations = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const { page, limit } = this.parseQueryParams(req.query);
      const cacheKey = this.generateCacheKey('newsletters', userId, { page, limit });
      const cacheExpiration = this.getCacheExpiration('newsletters');

      // Check cache first with more robust caching
      const cachedRecommendations = await redisClient.get(cacheKey);
      if (cachedRecommendations) {
        const parsedRecommendations = JSON.parse(cachedRecommendations);
        
        // Optional: Add cache hit tracking
        await redisClient.incr(`cache:hits:${cacheKey}`);
        
        res.json(parsedRecommendations);
        return;
      }

      const user = await this.findUserWithPreferences(userId);

      // If no preferences, return empty recommendations
      if (!user.preferences?.length) {
        res.status(200).json({ 
          newsletters: [], 
          message: 'No preferences set for personalized recommendations' 
        });
        return;
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

      // Cache the result with dynamic expiration
      await redisClient.set(
        cacheKey, 
        JSON.stringify(result), 
        'EX', 
        cacheExpiration
      );

      // Optional: Track cache misses
      await redisClient.incr(`cache:misses:${cacheKey}`);

      res.json(result);
    } catch (error: unknown) {
      next(error);
    }
  });

  _getRecommendedInterests = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const { limit } = this.parseQueryParams(req.query);
      const cacheKey = this.generateCacheKey('interests', userId, { limit });
      const cacheExpiration = this.getCacheExpiration('interests');

      // Check cache first with more robust caching
      const cachedInterests = await redisClient.get(cacheKey);
      if (cachedInterests) {
        const parsedInterests = JSON.parse(cachedInterests);
        
        // Optional: Add cache hit tracking
        await redisClient.incr(`cache:hits:${cacheKey}`);
        
        res.json(parsedInterests);
        return;
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

      // Cache the result with dynamic expiration
      await redisClient.set(
        cacheKey, 
        JSON.stringify(result), 
        'EX', 
        cacheExpiration
      );

      // Optional: Track cache misses
      await redisClient.incr(`cache:misses:${cacheKey}`);

      res.json(result);
    } catch (error: unknown) {
      next(error);
    }
  });
}
