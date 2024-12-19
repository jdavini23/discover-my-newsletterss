import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Interest } from '../models/Interest';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserPreferencesDto, UserPreferencesDto } from '../dtos/userPreferencesDto';
import { redisClient } from '../config/redis';

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export class UserPreferencesController {
  private userRepository = AppDataSource.getRepository(User);
  private interestRepository = AppDataSource.getRepository(Interest);

  // Update user preferences
  async updateUserPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id; // From JWT middleware
      
      // Transform and validate input
      const updateDto = plainToClass(UpdateUserPreferencesDto, {
        ...req.body,
        userId
      });
      
      const validationErrors = await validate(updateDto);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationErrors.map(error => ({
            property: error.property,
            constraints: Object.values(error.constraints || {})
          }))
        });
      }

      // Find the user
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['preferences']
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Process interests
      if (updateDto.interests) {
        const interestIds = updateDto.interests.map(i => i.id);
        const newInterests = await this.interestRepository.findByIds(interestIds);
        user.preferences = newInterests;
      }

      // Save updated user
      await this.userRepository.save(user);

      // Cache user preferences
      await redisClient.set(`user:preferences:${userId}`, JSON.stringify(user.preferences));

      res.json({ 
        message: 'Preferences updated successfully', 
        preferences: user.preferences 
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ error: 'Failed to update preferences' });
    }
  }

  // Fetch user preferences
  async getUserPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id; // From JWT middleware

      // Try to get from cache first
      const cachedPreferences = await redisClient.get(`user:preferences:${userId}`);
      if (cachedPreferences) {
        return res.json({ 
          interests: JSON.parse(cachedPreferences),
          source: 'cache'
        });
      }

      // Fetch from database if not in cache
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['preferences']
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Cache for future requests
      await redisClient.set(`user:preferences:${userId}`, JSON.stringify(user.preferences));

      res.json({ 
        interests: user.preferences,
        source: 'database'
      });
    } catch (error) {
      console.error('Error fetching preferences:', error);
      res.status(500).json({ error: 'Failed to fetch preferences' });
    }
  }
}
