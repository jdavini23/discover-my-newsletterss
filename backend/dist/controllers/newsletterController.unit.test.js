"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
const Newsletter_1 = require("../models/Newsletter");
const Interest_1 = require("../models/Interest");
const customErrors_1 = require("../utils/customErrors");
const newsletterController_1 = require("./newsletterController");
const database_1 = require("../config/database");
// Mock the entire AppDataSource
jest.mock('../config/database', () => ({
    AppDataSource: {
        getRepository: jest.fn()
    }
}));
describe('NewsletterController', () => {
    let controller;
    let mockNewsletterRepo;
    let mockInterestRepo;
    let mockRequest;
    let mockResponse;
    let mockNext;
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
        database_1.AppDataSource.getRepository.mockImplementation((entity) => {
            if (entity === Newsletter_1.Newsletter)
                return mockNewsletterRepo;
            if (entity === Interest_1.Interest)
                return mockInterestRepo;
            return null;
        });
        controller = new newsletterController_1.NewsletterController();
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
            const wrappedHandler = controller.createNewsletter;
            await wrappedHandler(mockRequest, mockResponse, mockNext);
            expect(mockNext.mock.calls[0][0]).toBeInstanceOf(customErrors_1.ValidationError);
            expect(mockNext.mock.calls[0][0].message).toBe('Missing required newsletter fields');
        });
        it('should create newsletter with valid data', async () => {
            const newsletterData = {
                name: 'Test Newsletter',
                description: 'Test Description',
                authorName: 'Test Author',
                url: 'http://test.com',
                frequency: Newsletter_1.NewsletterFrequency.WEEKLY,
                interestIds: [1, 2]
            };
            mockRequest.body = newsletterData;
            const mockInterests = [
                { id: 1, name: 'Interest 1' },
                { id: 2, name: 'Interest 2' }
            ];
            mockInterestRepo.findByIds.mockResolvedValue(mockInterests);
            mockNewsletterRepo.save.mockResolvedValue({ id: 1, ...newsletterData, interests: mockInterests });
            const wrappedHandler = controller.createNewsletter;
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
            const wrappedHandler = controller.getNewslettersByInterest;
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
            const wrappedHandler = controller.getNewslettersByInterest;
            await wrappedHandler(mockRequest, mockResponse, mockNext);
            expect(mockNext.mock.calls[0][0]).toBeInstanceOf(customErrors_1.NotFoundError);
            expect(mockNext.mock.calls[0][0].message).toBe('Interest not found with id 999');
        });
    });
});
