import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Newsletter, NewsletterFrequency } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { asyncHandler } from '../middleware/errorHandler';
import { ValidationError, NotFoundError } from '../utils/customErrors';
import { cacheNewsletter, getCachedNewsletter, deleteCachedNewsletter } from '../config/redis';

export class NewsletterController {
  private newsletterRepository = AppDataSource.getRepository(Newsletter);
  private interestRepository = AppDataSource.getRepository(Interest);

  // Create a new newsletter
  createNewsletter = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { 
        name, 
        description, 
        authorName, 
        url, 
        frequency, 
        interestIds 
      } = req.body;

      // Validate input
      if (!name || !description || !authorName || !url) {
        throw new ValidationError('Missing required newsletter fields');
      }

      // Find associated interests
      const interests = interestIds 
        ? await this.interestRepository.findByIds(interestIds) 
        : [];

      const newsletter = new Newsletter();
      newsletter.name = name;
      newsletter.description = description;
      newsletter.authorName = authorName;
      newsletter.url = url;
      newsletter.frequency = frequency || NewsletterFrequency.WEEKLY;
      newsletter.interests = interests;

      const savedNewsletter = await this.newsletterRepository.save(newsletter);

      // Cache the new newsletter
      const cacheKey = `newsletter:${savedNewsletter.id}`;
      await cacheNewsletter(cacheKey, savedNewsletter);

      res.status(201).json(savedNewsletter);
    } catch (error) {
      console.error('Error creating newsletter:', error);
      res.status(500).json({ message: 'Internal server error' });
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

      res.json({
        newsletters,
        page: Number(page),
        limit: Number(limit),
        total
      });
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get newsletter details
  getNewsletterById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const cacheKey = `newsletter:${id}`;

      // Try to get from cache first
      const cachedNewsletter = await getCachedNewsletter(cacheKey);
      if (cachedNewsletter) {
        return res.json(cachedNewsletter);
      }

      // If not in cache, fetch from database
      const newsletter = await this.newsletterRepository.findOne({ 
        where: { id },
        relations: ['interests'] 
      });

      if (!newsletter) {
        throw new NotFoundError('Newsletter');
      }

      // Cache the newsletter for 1 hour
      await cacheNewsletter(cacheKey, newsletter);

      res.json(newsletter);
    } catch (error) {
      console.error('Error fetching newsletter:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get newsletters by interest
  getNewslettersByInterest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { interestId } = req.params;

      // Check if interest exists
      const interest = await this.interestRepository.findOne({ where: { id: interestId } });
      if (!interest) {
        throw new NotFoundError(`Interest not found with id ${interestId}`);
      }

      // Get newsletters for the interest
      const newsletters = await this.newsletterRepository
        .createQueryBuilder('newsletter')
        .innerJoinAndSelect('newsletter.interests', 'interest')
        .where('interest.id = :interestId', { interestId })
        .getMany();

      res.status(200).json({
        status: 'success',
        data: newsletters
      });
    } catch (error) {
      console.error('Error fetching newsletters by interest:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
