import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Firebase Admin SDK
const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

// Validate service account file exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Service account file not found at: ${serviceAccountPath}`);
  console.error('Please download your Firebase service account JSON from the Firebase Console:');
  console.error('1. Go to Firebase Console');
  console.error('2. Select your project');
  console.error('3. Project Settings (gear icon)');
  console.error('4. Service Accounts tab');
  console.error('5. Click "Generate new private key"');
  console.error(
    '6. Save the downloaded JSON file as firebase-service-account.json in the project root'
  );
  process.exit(1);
}

try {
  initializeApp({
    credential: cert(serviceAccountPath),
  });
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  process.exit(1);
}

const db = getFirestore();

// Sample newsletter data
const newsletterData = [
  {
    title: 'Tech Insights Daily',
    description: 'Latest trends and innovations in technology',
    author: 'Sarah Johnson',
    category: 'Technology',
    frequency: 'Daily',
    subscriberCount: 15000,
    topics: ['AI', 'Startups', 'Gadgets'],
    rating: 4.7,
    coverImage: 'https://example.com/tech-insights.jpg',
    subscriptionLink: 'https://techinsightsdaily.com/subscribe',
  },
  {
    title: 'Green Future Weekly',
    description: 'Sustainability and environmental innovation news',
    author: 'Michael Green',
    category: 'Environment',
    frequency: 'Weekly',
    subscriberCount: 8500,
    topics: ['Climate Change', 'Renewable Energy', 'Conservation'],
    rating: 4.5,
    coverImage: 'https://example.com/green-future.jpg',
    subscriptionLink: 'https://greenfutureweekly.com/subscribe',
  },
  {
    title: 'Startup Pulse',
    description: 'Insights and stories from the startup ecosystem',
    author: 'Emma Rodriguez',
    category: 'Entrepreneurship',
    frequency: 'Bi-Weekly',
    subscriberCount: 12000,
    topics: ['Funding', 'Founders', 'Innovation'],
    rating: 4.8,
    coverImage: 'https://example.com/startup-pulse.jpg',
    subscriptionLink: 'https://startuppulse.com/subscribe',
  },
  {
    title: 'Data Science Digest',
    description: 'Deep dives into data science and machine learning',
    author: 'Alex Chen',
    category: 'Technology',
    frequency: 'Monthly',
    subscriberCount: 9000,
    topics: ['Machine Learning', 'Big Data', 'AI Ethics'],
    rating: 4.6,
    coverImage: 'https://example.com/data-science-digest.jpg',
    subscriptionLink: 'https://datasciencedigest.com/subscribe',
  },
  {
    title: 'Health Horizons',
    description: 'Cutting-edge medical research and wellness trends',
    author: 'Dr. Rachel Kim',
    category: 'Health',
    frequency: 'Weekly',
    subscriberCount: 11000,
    topics: ['Medical Research', 'Nutrition', 'Mental Health'],
    rating: 4.9,
    coverImage: 'https://example.com/health-horizons.jpg',
    subscriptionLink: 'https://healthhorizons.com/subscribe',
  },
];

async function seedNewsletters() {
  try {
    const newslettersRef = db.collection('newsletters');
    const batch = db.batch();

    newsletterData.forEach(newsletter => {
      const docRef = newslettersRef.doc(); // Auto-generate ID
      batch.set(docRef, newsletter);
    });

    await batch.commit();
    console.log('Successfully seeded newsletters collection!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding newsletters:', error);
    process.exit(1);
  }
}

seedNewsletters();
