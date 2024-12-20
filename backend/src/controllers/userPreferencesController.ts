import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserPreferencesDto } from '../dtos/userPreferencesDto';
import { redisClient } from '../config/redis';
import { asyncHandler } from '../middleware/errorHandler';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string };
}

export class UserPreferencesController {
  private userRepository = AppDataSource.getRepository(User);
  private interestRepository = AppDataSource.getRepository(Interest);

  private generateCacheKey(userId: string): string {
    return `user:preferences:${userId}`;
  }

  private async validatePreferencesUpdate(
    updateDto: UpdateUserPreferencesDto
  ): Promise<{ isValid: boolean; errors: Array<{ property: string; constraints: string[] }> }> {
    const validationErrors = await validate(updateDto);
    return {
      isValid: validationErrors._length === 0,
      errors: validationErrors.map((error) => ({
        property: error.property,
        constraints: Object.values(error.constraints || {}),
      })),
    };
  }

  _updateUserPreferences = asyncHandler(async (req: AuthenticatedRequest, _____res: Response): Promise<Response> => {
    const userId = req.user.id;
    const cacheKey = this.generateCacheKey(userId);

    // Transform and validate input
    const updateDto = plainToClass(UpdateUserPreferencesDto, {
      ...req.body,
      userId,
    });

    const validationResult = await this.validatePreferencesUpdate(updateDto);
    if (!validationResult.isValid) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationResult.errors,
      });
    }

    // Find the user
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['preferences'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Process interests
    if (updateDto.interests) {
      const interestIds = updateDto.interests.map((i) => i.id);
      const newInterests = await this.interestRepository.findByIds(interestIds);
      user.preferences = newInterests;
    }

    // Save updated user
    await this.userRepository.save(user);

    // Cache user preferences
    await redisClient.set(cacheKey, JSON.stringify(user.preferences));

    return res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences,
    });
  });

  _getUserPreferences = asyncHandler(async (req: AuthenticatedRequest, _____res: Response): Promise<Response> => {
    const userId = req.user.id;
    const cacheKey = this.generateCacheKey(userId);

    // Try to get from cache first
    const cachedPreferences = await redisClient.get(cacheKey);
    if (cachedPreferences) {
      return res.json({
        interests: JSON.parse(cachedPreferences),
        source: 'cache',
      });
    }

    // Fetch from database if not in cache
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['preferences'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cache for future requests
    await redisClient.set(cacheKey, JSON.stringify(user.preferences));

    return res.json({
      interests: user.preferences,
      source: 'database',
    });
  });
}
