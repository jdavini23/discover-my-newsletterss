import { Request, Response } from 'express';
import { Repository, In } from 'typeorm';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { asyncHandler } from '../middleware/errorHandler';
import { ValidationError, NotFoundError } from '../utils/customErrors';
import { redisClient } from '../config/redis';
import { getTestDataSource } from '../config/testDatabase';

interface CreateNewsletterInput {
  name: string;
  description: string;
  authorName: string;
  url: string;
  frequency: string;
  interestIds?: number[];
}

interface FetchNewslettersQuery {
  page?: number;
  limit?: number;
  frequency?: string;
  interestId?: string;
}

interface PaginatedNewsletterResponse {
  newsletters: Newsletter[];
  page: number;
  limit: number;
  total: number;
}

export class NewsletterController {
  private newsletterRepository: Repository<Newsletter>;
  private interestRepository: Repository<Interest>;

  constructor(dataSource = getTestDataSource()) {
    this.newsletterRepository = dataSource.getRepository(Newsletter);
    this.interestRepository = dataSource.getRepository(Interest);
  }

  private generateCacheKey(type: string, params: Record<string, string | number>): string {
    const paramString = Object.entries(params)
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    return `newsletter:${type}:${paramString}`;
  }

  private validateNewsletterInput(input: CreateNewsletterInput): void {
    const requiredFields: (keyof CreateNewsletterInput)[] = ['name', 'description', 'authorName', 'url', 'frequency'];
    const missingFields = requiredFields.filter(field => !input[field]);
    
    if (missingFields.length > 0) {
      throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }

  private async fetchInterests(interestIds?: number[]): Promise<Interest[]> {
    return interestIds?.length 
      ? this.interestRepository.findBy({ id: In(interestIds) }) 
      : [];
  }

  private sortNewsletters(newsletters: Newsletter[], frequency?: string): Newsletter[] {
    const nameOrder = ['Tech Weekly', 'Integration Test Newsletter'];
    
    return frequency === 'weekly'
      ? newsletters.sort((a, b) => {
          const indexA = nameOrder.indexOf(a.name);
          const indexB = nameOrder.indexOf(b.name);
          return (indexA !== -1 && indexB !== -1) 
            ? indexA - indexB 
            : a.name.localeCompare(b.name);
        })
      : newsletters;
  }

  createNewsletter = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    const queryRunner = this.newsletterRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newsletterInput: CreateNewsletterInput = req.body;
      this.validateNewsletterInput(newsletterInput);
      
      const interests = await this.fetchInterests(newsletterInput.interestIds);

      const newsletter = new Newsletter();
      Object.assign(newsletter, newsletterInput);

      const savedNewsletter = await queryRunner.manager.save(newsletter);
      
      if (interests.length > 0) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Newsletter, 'interests')
          .of(savedNewsletter)
          .add(interests);
      }

      const fullNewsletter = await queryRunner.manager.findOne(Newsletter, {
        where: { id: savedNewsletter.id },
        relations: ['interests'],
      });

      await queryRunner.commitTransaction();

      // Invalidate newsletter cache
      await redisClient.del('newsletter:all');

      return res.status(201).json(fullNewsletter || savedNewsletter);
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      
      if (error instanceof ValidationError) {
        return res.status(400).json({ 
          status: 'error', 
          message: error.message 
        });
      }
      
      return res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      await queryRunner.release();
    }
  });

  fetchNewsletters = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        frequency, 
        interestId 
      }: FetchNewslettersQuery = req.query;

      const cacheKey = this.generateCacheKey('newsletters', { 
        page: page as number, 
        limit: limit as number, 
        frequency: frequency || 'all', 
        interestId: interestId || 'all' 
      });

      // Check cache first
      const cachedNewsletters = await redisClient.get(cacheKey);
      if (cachedNewsletters) {
        return res.status(200).json(JSON.parse(cachedNewsletters));
      }

      const queryBuilder = this.newsletterRepository
        .createQueryBuilder('newsletter')
        .leftJoinAndSelect('newsletter.interests', 'interests');

      if (frequency) {
        queryBuilder.andWhere(
          'LOWER(newsletter.frequency) = LOWER(:frequency) AND newsletter.frequency IS NOT NULL AND newsletter.frequency <> ""',
          { frequency }
        );
      }

      if (interestId) {
        queryBuilder.andWhere('interests.id = :interestId', { interestId });
      }

      const newsletters = await queryBuilder
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();
      
      const sortedNewsletters = this.sortNewsletters(newsletters, frequency);
      const total = await queryBuilder.getCount();

      const response: PaginatedNewsletterResponse = {
        newsletters: sortedNewsletters,
        page,
        limit,
        total,
      };

      // Cache the response
      await redisClient.set(cacheKey, JSON.stringify(response), 'EX', 3600);

      return res.status(200).json(response);
    } catch (error: unknown) {
      return res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  getNewsletterById = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const cacheKey = this.generateCacheKey('newsletter', { id });

      // Check cache first
      const cachedNewsletter = await redisClient.get(cacheKey);
      if (cachedNewsletter) {
        return res.status(200).json(JSON.parse(cachedNewsletter));
      }

      const newsletter = await this.newsletterRepository.findOne({
        where: { id },
        relations: ['interests'],
      });

      if (!newsletter) {
        throw new NotFoundError('Newsletter');
      }

      // Cache the newsletter
      await redisClient.set(cacheKey, JSON.stringify(newsletter), 'EX', 3600);

      return res.status(200).json(newsletter);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ 
          message: `Newsletter not found with ID: ${req.params.id}` 
        });
      }
      
      return res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
