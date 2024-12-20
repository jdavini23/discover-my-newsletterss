import { RecommendationController } from '../controllers/recommendationController';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { redisClient } from '../config/redis';
import { NotFoundError } from '../utils/customErrors';

// Custom type to extend Request
interface CustomRequest extends Request {
  user: { id: string; email: string };
}

// Mock dependencies
jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn()
  }
}));

jest.mock('../config/redis', () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn()
  }
}));

describe('RecommendationController', () => {
  let recommendationController: RecommendationController;
  let mockUserRepository: any;
  let mockNewsletterRepository: any;
  let mockInterestRepository: any;
  let mockRequest: Partial<CustomRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock<NextFunction>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup mock repositories
    mockUserRepository = {
      findOne: jest.fn()
    };
    mockNewsletterRepository = {
      createQueryBuilder: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn()
    };
    mockInterestRepository = {};

    // Mock AppDataSource repository getter
    (AppDataSource.getRepository as jest.Mock)
      .mockImplementation((entity) => {
        if (entity === User) return mockUserRepository;
        if (entity === Newsletter) return mockNewsletterRepository;
        if (entity === Interest) return mockInterestRepository;
      });

    // Create controller instance
    recommendationController = new RecommendationController();

    // Setup mock request, response, and next function
    mockRequest = {
      user: { id: 'user123', email: 'test@example.com' },
      query: { page: '1', limit: '10' }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  describe('_getPersonalizedRecommendations', () => {
    it('should return cached recommendations if available', async () => {
      // Prepare cached data
      const cachedRecommendations = JSON.stringify({
        newsletters: [{ id: 'newsletter1', name: 'Tech Weekly' }],
        page: 1,
        limit: 10,
        total: 1
      });
      (redisClient.get as jest.Mock).mockResolvedValue(cachedRecommendations);

      // Call method
      await recommendationController._getPersonalizedRecommendations(
        mockRequest as CustomRequest, 
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(redisClient.get).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(JSON.parse(cachedRecommendations));
    });

    it('should return empty recommendations when user has no preferences', async () => {
      // Mock user with no preferences
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue({
        id: 'user123',
        preferences: []
      });

      // Call method
      await recommendationController._getPersonalizedRecommendations(
        mockRequest as CustomRequest, 
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          newsletters: [],
          message: 'No preferences set for personalized recommendations'
        })
      );
    });

    it('should handle user not found error', async () => {
      // Mock user not found
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      // Call method and expect error to be passed to next
      await recommendationController._getPersonalizedRecommendations(
        mockRequest as CustomRequest, 
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
    });

    it('should fetch and cache personalized recommendations', async () => {
      // Prepare mock data
      const mockInterests = [{ id: 'interest1' }];
      const mockNewsletters = [{ id: 'newsletter1', name: 'Tech Weekly' }];
      
      // Mock method calls
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue({
        id: 'user123',
        preferences: mockInterests
      });
      (mockNewsletterRepository.getManyAndCount as jest.Mock)
        .mockResolvedValue([mockNewsletters, 1]);

      // Call method
      await recommendationController._getPersonalizedRecommendations(
        mockRequest as CustomRequest, 
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(mockNewsletterRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockNewsletterRepository.getManyAndCount).toHaveBeenCalled();
      expect(redisClient.set).toHaveBeenCalled(); // Verify caching
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          newsletters: mockNewsletters,
          page: 1,
          limit: 10,
          total: 1
        })
      );
    });
  });
});
