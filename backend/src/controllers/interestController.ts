import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Interest } from '../models/Interest';
import { User } from '../models/User';
import { asyncHandler } from '../middleware/errorHandler';
import { redisClient } from '../config/redis';

interface InterestWizardQuestion {
  id: number;
  question: string;
  options: Array<{
    id: string;
    name: string;
    description?: string;
    icon?: string;
  }>;
}

export class InterestController {
  private static userRepository = AppDataSource.getRepository(User);
  private static interestRepository = AppDataSource.getRepository(Interest);

  private static async ensureDbConnection(): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  }

  private static generateCacheKey(type: 'all' | 'wizard'): string {
    return `interests:${type}`;
  }

  // GET /interests
  static getAllInterests = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    await this.ensureDbConnection();
    const cacheKey = this.generateCacheKey('all');

    // Check cache first
    const cachedInterests = await redisClient.get(cacheKey);
    if (cachedInterests) {
      return res.json(JSON.parse(cachedInterests));
    }

    const interests = await this.interestRepository.find();

    // Cache interests for future requests
    await redisClient.set(cacheKey, JSON.stringify(interests), 'EX', 3600);

    return res.json(interests);
  });

  // POST /users/:id/preferences
  static updateUserPreferences = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    await this.ensureDbConnection();

    const userId = req.params.id;
    const { interestIds } = req.body;

    // Find user
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['preferences'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all interests
    const interests = await this.interestRepository.findByIds(interestIds);

    if (interests.length !== interestIds.length) {
      return res.status(400).json({ message: 'Some interests were not found' });
    }

    // Update user preferences
    user.preferences = interests;
    await this.userRepository.save(user);

    // Update user preferences cache
    await redisClient.set(`user:preferences:${userId}`, JSON.stringify(interests));

    return res.json({ 
      message: 'Preferences updated successfully', 
      preferences: interests 
    });
  });

  // POST /interests/wizard
  static getInterestWizardQuestions = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    await this.ensureDbConnection();
    const cacheKey = this.generateCacheKey('wizard');

    // Check cache first
    const cachedQuestions = await redisClient.get(cacheKey);
    if (cachedQuestions) {
      return res.json(JSON.parse(cachedQuestions));
    }

    const interests = await this.interestRepository.find();

    // Group interests into categories/questions
    const questions: InterestWizardQuestion[] = [
      {
        id: 1,
        question: 'What type of content interests you the most?',
        options: interests.map((interest) => ({
          id: interest.id,
          name: interest.name,
          description: interest.description,
          icon: interest.icon,
        })),
      },
    ];

    // Cache wizard questions for future requests
    await redisClient.set(cacheKey, JSON.stringify(questions), 'EX', 3600);

    return res.json(questions);
  });
}
