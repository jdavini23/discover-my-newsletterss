import { initializeDatabase, AppDataSource } from '../config/database';
;
import { Newsletter, NewsletterFrequency } from '../models/Newsletter';
import { Interest } from '../models/Interest';

async function seedNewsletters(): Promise<void> {
  try {
    // Initialize database
    await initializeDatabase();

    // Get repositories
    const newsletterRepository = AppDataSource.getRepository(Newsletter);
    const interestRepository = AppDataSource.getRepository(Interest);

    // Find some interests to associate with newsletters
    const interests = await interestRepository.find({ take: 2 });

    // Create sample newsletters if none exist
    const existingNewsletters = await newsletterRepository.count();
    if (existingNewsletters === 0) {
      const newslettersToSeed = [
        {
          name: 'Tech Insights Weekly',
          description: 'Latest technology trends and innovations',
          authorName: 'Tech Innovations Inc.',
          url: 'https://techinsights.com',
          frequency: NewsletterFrequency.WEEKLY,
          interests: interests.slice(0, 1),
        },
        {
          name: 'Science Frontiers Monthly',
          description: 'Cutting-edge scientific discoveries and research',
          authorName: 'Global Science Research',
          url: 'https://sciencefrontiers.org',
          frequency: NewsletterFrequency.MONTHLY,
          interests: interests.slice(1, 2),
        },
      ];

      for (const newsletterData of newslettersToSeed) {
        const newsletter = newsletterRepository.create({
          name: newsletterData.name,
          description: newsletterData.description,
          authorName: newsletterData.authorName,
          url: newsletterData.url,
          frequency: newsletterData.frequency,
        });

        await newsletterRepository.save(newsletter);
        console.log(`Seeded newsletter: ${newsletter.name}`);
      }
    } else {
      console.log('Newsletters already exist. Skipping seeding.');
    }

    console.log('Newsletter seeding completed successfully');
  } catch (_error: unknown) {
    console.error('Error seeding newsletters:', error);
    throw error;
  } finally {
    // Close the database connection
    await AppDataSource.destroy();
  }
}

// Run the seed script
seedNewsletters()
  .then(() => console.log('Newsletter seeding process finished'))
  .catch(console.error)
  .finally(() => process.exit(0));
