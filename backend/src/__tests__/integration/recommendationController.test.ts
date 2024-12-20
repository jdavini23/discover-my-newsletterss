import request from 'supertest';
import { app } from '../../app';
import { AppDataSource } from '../../config/database';
import { User } from '../../models/User';
import { Interest } from '../../models/Interest';
import { Newsletter } from '../../models/Newsletter';
import { generateJwtToken } from '../../utils/authUtils';

describe('Recommendation Controller Integration Tests', () => {
  let authToken: string;
  let testUser: User;
  let testInterests: Interest[];
  let testNewsletters: Newsletter[];

  beforeAll(async () => {
    // Ensure database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Create test user
    const userRepository = AppDataSource.getRepository(User);
    const interestRepository = AppDataSource.getRepository(Interest);
    const newsletterRepository = AppDataSource.getRepository(Newsletter);

    // Create test interests
    testInterests = await interestRepository.save([
      { name: 'Technology' },
      { name: 'Science' },
      { name: 'Business' },
    ]);

    // Create test newsletters
    testNewsletters = await newsletterRepository.save([
      {
        title: 'Tech Weekly',
        description: 'Latest tech news',
        interests: [testInterests[0]],
        averageRating: 4.5,
      },
      {
        title: 'Science Digest',
        description: 'Scientific discoveries',
        interests: [testInterests[1]],
        averageRating: 4.7,
      },
    ]);

    // Create test user with preferences
    testUser = await userRepository.save({
      email: 'test.recommendations@example.com',
      password: 'testpassword123',
      preferences: [testInterests[0]],
    });

    // Generate JWT token
    authToken = generateJwtToken(testUser);
  });

  afterAll(async () => {
    // Clean up test data
    const userRepository = AppDataSource.getRepository(User);
    const interestRepository = AppDataSource.getRepository(Interest);
    const newsletterRepository = AppDataSource.getRepository(Newsletter);

    await newsletterRepository.remove(testNewsletters);
    await interestRepository.remove(testInterests);
    await userRepository.remove(testUser);

    await AppDataSource.destroy();
  });

  describe('GET /recommendations/newsletters', () => {
    it('should return personalized newsletter recommendations', async () => {
      const response = await request(app)
        .get('/api/recommendations/newsletters')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.newsletters).toBeDefined();
      expect(response.body.total).toBeDefined();
      expect(response.body.matchedInterests).toBeDefined();
    });

    it('should handle no preferences scenario', async () => {
      // Create a user without preferences
      const noPreferencesUser = await AppDataSource.getRepository(User).save({
        email: 'no.preferences@example.com',
        password: 'testpassword123',
      });
      const noPreferencesToken = generateJwtToken(noPreferencesUser);

      const response = await request(app)
        .get('/api/recommendations/newsletters')
        .set('Authorization', `Bearer ${noPreferencesToken}`)
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.newsletters).toHaveLength(0);
      expect(response.body.message).toBe('No preferences set for personalized recommendations');

      // Clean up
      await AppDataSource.getRepository(User).remove(noPreferencesUser);
    });
  });

  describe('GET /recommendations/interests', () => {
    it('should return recommended interests', async () => {
      const response = await request(app)
        .get('/api/recommendations/interests')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ limit: 5 });

      expect(response.status).toBe(200);
      expect(response.body.recommendedInterests).toBeDefined();
      expect(response.body.currentInterests).toBeDefined();
    });
  });
});
