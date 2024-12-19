/// <reference types="jest" />

import { Request, Response } from 'express';
import { Newsletter, NewsletterFrequency } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { ValidationError, NotFoundError } from '../utils/customErrors';
import { NewsletterController } from './newsletterController';
import { AppDataSource } from '../config/database';

// Mock the entire AppDataSource
jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn()
  }
}));

describe('NewsletterController', () => {
  let controller: NewsletterController;
  let mockNewsletterRepo: any;
  let mockInterestRepo: any;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockNewsletterRepo = {
      save: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn(),
        getMany: jest.fn()
      })
    };

    mockInterestRepo = {
      findByIds: jest.fn(),
      findOne: jest.fn()
    };

    // Mock the AppDataSource to return our mock repositories
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === Newsletter) return mockNewsletterRepo;
      if (entity === Interest) return mockInterestRepo;
      return null;
    });

    controller = new NewsletterController();
    
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockNext = jest.fn();
  });

  describe('createNewsletter', () => {
    it('should throw ValidationError if required fields are missing', async () => {
      mockRequest.body = {
        name: '',
        description: '',
        authorName: '',
        url: ''
      };

      const wrappedHandler = controller.createNewsletter as any;
      await wrappedHandler(mockRequest, mockResponse, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(ValidationError);
      expect(mockNext.mock.calls[0][0].message).toBe('Missing required newsletter fields');
    });

    it('should create newsletter with valid data', async () => {
      const newsletterData = {
        name: 'Test Newsletter',
        description: 'Test Description',
        authorName: 'Test Author',
        url: 'http://test.com',
        frequency: NewsletterFrequency.WEEKLY,
        interestIds: [1, 2]
      };

      mockRequest.body = newsletterData;
      
      const mockInterests = [
        { id: 1, name: 'Interest 1' },
        { id: 2, name: 'Interest 2' }
      ];

      mockInterestRepo.findByIds.mockResolvedValue(mockInterests);
      mockNewsletterRepo.save.mockResolvedValue({ id: 1, ...newsletterData, interests: mockInterests });

      const wrappedHandler = controller.createNewsletter as any;
      await wrappedHandler(mockRequest, mockResponse, mockNext);

      expect(mockInterestRepo.findByIds).toHaveBeenCalledWith(newsletterData.interestIds);
      expect(mockNewsletterRepo.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getNewslettersByInterest', () => {
    it('should return newsletters for valid interest', async () => {
      const interestId = '1';
      mockRequest.params = { interestId };

      const mockInterest = { id: 1, name: 'Test Interest' };
      const mockNewsletters = [
        { id: 1, name: 'Newsletter 1' },
        { id: 2, name: 'Newsletter 2' }
      ];

      mockInterestRepo.findOne.mockResolvedValue(mockInterest);
      mockNewsletterRepo.createQueryBuilder().innerJoinAndSelect().where().getMany.mockResolvedValue(mockNewsletters);

      const wrappedHandler = controller.getNewslettersByInterest as any;
      await wrappedHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockNewsletters
      });
    });

    it('should throw NotFoundError for invalid interest', async () => {
      mockRequest.params = { interestId: '999' };
      mockInterestRepo.findOne.mockResolvedValue(null);

      const wrappedHandler = controller.getNewslettersByInterest as any;
      await wrappedHandler(mockRequest, mockResponse, mockNext);

      expect(mockNext.mock.calls[0][0]).toBeInstanceOf(NotFoundError);
      expect(mockNext.mock.calls[0][0].message).toBe('Interest not found with id 999');
    });
  });
});
