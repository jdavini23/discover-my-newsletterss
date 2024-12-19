import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Interest } from '../models/Interest';

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

  // Update user preferences (interests)
  async updateUserPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { interestIds } = req.body;

      if (!interestIds || !Array.isArray(interestIds)) {
        return res.status(400).json({ error: 'Invalid interest IDs' });
      }

      // Find the user with existing preferences
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['preferences']
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Find the new interests
      const newInterests = await this.interestRepository.findByIds(interestIds);

      // Update user preferences
      user.preferences = newInterests;
      await this.userRepository.save(user);

      res.json({ 
        message: 'Preferences updated successfully', 
        interests: newInterests 
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

      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['preferences']
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ interests: user.preferences });
    } catch (error) {
      console.error('Error fetching preferences:', error);
      res.status(500).json({ error: 'Failed to fetch preferences' });
    }
  }
}
