import { AppDataSource } from '../config/database';
import { Interest } from '../models/Interest';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const interests = [
  {
    name: 'Technology',
    description: 'Latest tech news, innovations, and trends',
    icon: 'computer',
  },
  {
    name: 'Science',
    description: 'Scientific discoveries, research, and breakthroughs',
    icon: 'microscope',
  },
  {
    name: 'Business',
    description: 'Startup news, entrepreneurship, and market insights',
    icon: 'briefcase',
  },
  {
    name: 'Health & Wellness',
    description: 'Fitness, nutrition, mental health, and medical advances',
    icon: 'heart',
  },
  {
    name: 'Arts & Culture',
    description: 'Music, art, literature, and cultural events',
    icon: 'palette',
  },
  {
    name: 'Travel',
    description: 'Destinations, travel tips, and adventure stories',
    icon: 'airplane',
  },
  {
    name: 'Sports',
    description: 'Sports news, athlete stories, and game highlights',
    icon: 'football',
  },
  {
    name: 'Environment',
    description: 'Climate change, sustainability, and conservation',
    icon: 'leaf',
  },
];

async function seedInterests(): Promise<void> {
  try {
    console.log('Initializing database connection...');

    // Initialize the database connection
    await AppDataSource.initialize();
    console.log('Database connection established successfully');

    // Get the Interest repository
    const interestRepository = AppDataSource.getRepository(Interest);

    // Check if interests already exist
    const existingInterests = await interestRepository.find();
    if (existingInterests.length > 0) {
      console.log('Interests already seeded. Skipping...');
      return;
    }

    // Create and save interests
    for (const interestData of interests) {
      const interest = new Interest();
      interest.name = interestData.name;
      interest.description = interestData.description;
      interest.icon = interestData.icon;

      await interestRepository.save(interest);
      console.log(`Saved interest: ${interest.name}`);
    }

    console.log('Interests seeded successfully!');
  } catch (_error: unknown) {
    console.error('Error seeding interests:', error);
  } finally {
    // Close the connection
    try {
      await AppDataSource.destroy();
      console.log('Database connection closed');
    } catch (_error: unknown) {
      console.error('Error closing database connection:', closeError);
    }
    process.exit(0);
  }
}

seedInterests();
