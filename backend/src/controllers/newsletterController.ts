import { Request, Response, NextFunction } from 'express';
import { getTestDataSource } from '../config/testDatabase';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { asyncHandler } from '../middleware/errorHandler';
import { ValidationError, NotFoundError } from '../utils/customErrors';
import { cacheNewsletter, getCachedNewsletter, deleteCachedNewsletter } from '../config/redis';
import { Repository, DataSource } from 'typeorm';
import { In } from 'typeorm';

export class NewsletterController {
  private newsletterRepository;
  private interestRepository;

  constructor(dataSource = getTestDataSource()) {
    this.newsletterRepository = dataSource.getRepository(Newsletter);
    this.interestRepository = dataSource.getRepository(Interest);
  }

  // Create a new newsletter
  createNewsletter = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const queryRunner = this.newsletterRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { 
        name, 
        description, 
        authorName, 
        url, 
        frequency, 
        interestIds 
      } = req.body;

      console.log('Newsletter creation request:', { 
        name, 
        description, 
        authorName, 
        url, 
        frequency, 
        interestIds 
      });

      // Validate input
      if (!name || !description || !authorName || !url || !frequency) {
        console.warn('Missing required newsletter fields');
        throw new ValidationError('Missing required newsletter fields');
      }

      // Find interests using repository method
      const interestRepo = this.newsletterRepository.manager.connection.getRepository(Interest);
      const newsletterRepo = this.newsletterRepository;
      console.log('Interest IDs:', interestIds);
      
      // Fetch interests using a single query with IN clause
      const interests = await interestRepo.createQueryBuilder('interest')
        .where('interest.id IN (:...ids)', { ids: interestIds })
        .getMany();
      
      console.log('Retrieved interests:', interests);

      // Create newsletter with interests
      const newsletter = new Newsletter();
      newsletter.name = name;
      newsletter.description = description;
      newsletter.authorName = authorName;
      newsletter.url = url;
      newsletter.frequency = frequency;

      // Save newsletter first
      const savedNewsletter = await queryRunner.manager.save(newsletter, { 
        reload: true,
        transaction: false 
      });

      // Explicitly associate and save interests
      if (interests.length > 0) {
        savedNewsletter.interests = interests;
        
        // Use repository to save with relations
        await newsletterRepo.save(savedNewsletter);
      }

      console.log('Saved newsletter:', savedNewsletter);

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Fetch the newsletter with interests to return
      const fullNewsletter = await queryRunner.manager.findOne(Newsletter, { 
        where: { id: savedNewsletter.id },
        relations: ['interests'] 
      });

      console.log('Saved newsletter:', fullNewsletter);
      console.log('Saved newsletter interests:', fullNewsletter?.interests);
      console.log('Saved newsletter interests IDs:', fullNewsletter?.interests.map(i => i.id));

      res.status(201).json(fullNewsletter);
    } catch (error: unknown) {
      // Rollback the transaction in case of an error
      await queryRunner.rollbackTransaction();

      console.error('Error creating newsletter:', error);
      if (error instanceof ValidationError) {
        res.status(400).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ 
          message: 'Internal server error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  });

  // Fetch newsletters with optional filtering
  fetchNewsletters = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        frequency, 
        interestId 
      } = req.query;

      console.log('Fetch newsletters request:', { page, limit, frequency, interestId });

      const queryBuilder = this.newsletterRepository.createQueryBuilder('newsletter')
        .leftJoinAndSelect('newsletter.interests', 'interests')
        .skip((Number(page) - 1) * Number(limit))
        .take(Number(limit));

      if (frequency) {
        queryBuilder.andWhere('newsletter.frequency = :frequency', { frequency });
      }

      if (interestId) {
        queryBuilder.andWhere('interests.id = :interestId', { interestId });
      }

      const [newsletters, total] = await queryBuilder.getManyAndCount();

      console.log('Fetched newsletters:', newsletters);

      res.status(200).json({
        newsletters,
        page: Number(page),
        limit: Number(limit),
        total
      });
    } catch (error: unknown) {
      console.error('Error fetching newsletters:', error);
      res.status(500).json({ 
        message: 'Internal server error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Get newsletter details
  getNewsletterById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log('Get newsletter by ID request:', id);

      // If not in cache, fetch from database
      const newsletter = await this.newsletterRepository.findOne({ 
        where: { id },
        relations: ['interests'] 
      });

      console.log('Found newsletter:', newsletter);

      if (!newsletter) {
        console.warn(`Newsletter not found with ID: ${id}`);
        throw new NotFoundError('Newsletter');
      }

      res.status(200).json(newsletter);
    } catch (error: unknown) {
      console.error('Error fetching newsletter:', error);
      if (error instanceof NotFoundError) {
        res.status(404).json({ status: 'error', message: 'Newsletter not found' });
      } else {
        res.status(500).json({ 
          message: 'Internal server error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }
  });

  // Get newsletters by interest
  getNewslettersByInterest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { interestId } = req.params;

      console.log('Get newsletters by interest request:', interestId);

      // Check if interest exists
      const interest = await this.interestRepository.findOne({ where: { id: interestId } });
      if (!interest) {
        console.warn(`Interest not found with id ${interestId}`);
        throw new NotFoundError(`Interest not found with id ${interestId}`);
      }

      // Get newsletters for the interest
      const newsletters = await this.newsletterRepository
        .createQueryBuilder('newsletter')
        .innerJoinAndSelect('newsletter.interests', 'interest')
        .where('interest.id = :interestId', { interestId })
        .getMany();

      console.log('Found newsletters for interest:', newsletters);

      res.status(200).json({
        status: 'success',
        data: newsletters
      });
    } catch (error: unknown) {
      console.error('Error fetching newsletters by interest:', error);
      res.status(500).json({ 
        message: 'Internal server error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });
}
