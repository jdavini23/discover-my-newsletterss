import request from 'supertest';
import { app } from '../app';
import { Newsletter } from '../models/Newsletter';
import { Interest } from '../models/Interest';
import { setupTestDatabase, teardownTestDatabase, getTestDataSource } from '../config/testDatabase';

describe('Newsletter Routes Integration Tests', () => {
  let testInterest: Interest;

  beforeAll(async () => {
    // Initialize test database
    await setupTestDatabase();

    // Create a test interest
    const dataSource = getTestDataSource();
    const interestRepo = dataSource.getRepository(Interest);
    testInterest = new Interest();
    testInterest.name = 'Test Interest';
    const savedTestInterest = await interestRepo.save(testInterest);
    console.log('Saved Test Interest:', savedTestInterest);
    console.log('Saved Test Interest ID:', savedTestInterest.id);

    // Verify the interest was saved
    const foundInterest = await interestRepo.findOne({ where: { id: savedTestInterest.id } });
    console.log('Found Interest:', foundInterest);
    expect(foundInterest).toBeDefined();
    expect(foundInterest?.id).toBe(savedTestInterest.id);
    expect(foundInterest?.name).toBe('Test Interest');
  });

  afterAll(async () => {
    // Cleanup test database
    await teardownTestDatabase();
  });

  describe('POST /newsletters', () => {
    it('should create a new newsletter', async () => {
      const newsletterData = {
        name: 'Integration Test Newsletter',
        description: 'A newsletter created during integration testing',
        authorName: 'Test Author',
        url: 'https://test-newsletter.com',
        frequency: 'weekly',
        interestIds: [testInterest.id],
      };

      const response = await request(app).post('/newsletters').send(newsletterData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        name: 'Integration Test Newsletter',
        description: 'A newsletter created during integration testing',
        authorName: 'Test Author',
        url: 'https://test-newsletter.com',
        frequency: 'weekly',
      });

      // Verify interests are correctly associated
      const dataSource = getTestDataSource();
      const newsletterRepo = dataSource.getRepository(Newsletter);
      const savedNewsletter = await newsletterRepo.findOne({
        where: { id: response.body.id },
        relations: ['interests'],
      });

      console.log('Saved Newsletter:', savedNewsletter);
      console.log('Associated Interests:', savedNewsletter?.interests);

      expect(savedNewsletter).toBeDefined();
      expect(savedNewsletter?.interests).toHaveLength(1);
      expect(savedNewsletter?.interests[0].id).toBe(testInterest.id);

      // Verify via GET request
      const getResponse = await request(app).get(`/newsletters/${response.body.id}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.interests).toHaveLength(1);
      expect(getResponse.body.interests[0].id).toBe(testInterest.id);
    });

    it('should return validation error for incomplete newsletter', async () => {
      const incompleteNewsletterData = {
        name: 'Incomplete Newsletter',
      };

      const response = await request(app).post('/newsletters').send(incompleteNewsletterData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('Missing required');
    });
  });

  describe('GET /newsletters', () => {
    beforeEach(async () => {
      // Seed some newsletters for testing
      const dataSource = getTestDataSource();
      const newsletterRepo = dataSource.getRepository(Newsletter);
      const existingNewsletters = await newsletterRepo.find();
      const newslettersToSave = [
        {
          name: 'Tech Weekly',
          description: 'Tech news newsletter',
          authorName: 'Tech Insider',
          url: 'https://techweekly.com',
          frequency: 'weekly',
          interests: [testInterest],
        },
        {
          name: 'Science Monthly',
          description: 'Science discoveries newsletter',
          authorName: 'Science Mag',
          url: 'https://sciencemonthly.com',
          frequency: 'monthly',
          interests: [testInterest],
        },
        {
          name: 'Integration Test Newsletter',
          description: 'A newsletter created during integration testing',
          authorName: 'Test Author',
          url: 'https://test-newsletter.com',
          frequency: 'weekly',
          interests: [testInterest],
        },
      ].filter((newsletter) => {
        return !existingNewsletters.find(
          (existingNewsletter) => existingNewsletter.name === newsletter.name
        );
      });
      await newsletterRepo.save(newslettersToSave);
    });

    it('should fetch newsletters with pagination', async () => {
      const response = await request(app).get('/newsletters').query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.newsletters).toHaveLength(3);
      expect(response.body.total).toBe(3);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(10);
    });

    it('should filter newsletters by frequency', async () => {
      const response = await request(app).get('/newsletters').query({ frequency: 'weekly' });

      expect(response.status).toBe(200);
      expect(response.body.newsletters).toHaveLength(2);
      expect(response.body.newsletters[0].name).toBe('Tech Weekly');
    });
  });

  describe('GET /newsletters/:id', () => {
    let testNewsletterId: string;

    beforeEach(async () => {
      // Create a test newsletter
      const dataSource = getTestDataSource();
      const newsletterRepo = dataSource.getRepository(Newsletter);
      const existingNewsletters = await newsletterRepo.find();
      const newsletter = {
        name: 'Test Get Newsletter',
        description: 'Newsletter for get by ID test',
        authorName: 'Test Author',
        url: 'https://test-get.com',
        frequency: 'daily',
        interests: [testInterest],
      };
      const existingNewsletter = existingNewsletters.find(
        (existingNewsletter) => existingNewsletter.name === newsletter.name
      );
      if (!existingNewsletter) {
        const newNewsletter = new Newsletter();
        newNewsletter.name = newsletter.name;
        newNewsletter.description = newsletter.description;
        newNewsletter.authorName = newsletter.authorName;
        newNewsletter.url = newsletter.url;
        newNewsletter.frequency = newsletter.frequency;
        newNewsletter.interests = newsletter.interests;
        const savedNewsletter = await newsletterRepo.save(newNewsletter);
        testNewsletterId = savedNewsletter.id;
      } else {
        testNewsletterId = existingNewsletter.id;
      }
    });

    it('should get newsletter by ID with interests', async () => {
      const response = await request(app).get(`/newsletters/${testNewsletterId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Test Get Newsletter');
      expect(response.body.interests).toHaveLength(1);
      expect(response.body.interests[0].id).toBe(testInterest.id);
    });

    it('should return 404 for non-existent newsletter', async () => {
      const response = await request(app).get('/newsletters/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('Newsletter not found');
    });
  });
});
