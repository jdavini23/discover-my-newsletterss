import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth } from '@/config/firebase';
import { User, Newsletter, UserNewsletterInteraction, NewsletterFilter } from '@/types/firestore';

const db = getFirestore();

// Record user interaction with a newsletter
export const recordNewsletterInteraction = async (
  newsletterId: string,
  interactionType: UserNewsletterInteraction['interactionType'],
  duration?: number
) => {
  if (!auth.currentUser) throw new Error('No authenticated user');

  const interactionRef = collection(db, 'userNewsletterInteractions');

  const interaction: UserNewsletterInteraction = {
    id: '', // Firestore will generate this
    userId: auth.currentUser.uid,
    newsletterId,
    interactionType,
    timestamp: Timestamp.now(),
    duration,
  };

  // Add interaction record
  const docRef = await addDoc(interactionRef, interaction);

  // Update user's recommendation profile
  const userRef = doc(db, 'users', auth.currentUser.uid);
  await updateDoc(userRef, {
    'recommendationProfile.viewedNewsletters':
      interactionType === 'view' ? { $addToSet: newsletterId } : undefined,
    'recommendationProfile.subscribedNewsletters':
      interactionType === 'subscribe' ? { $addToSet: newsletterId } : undefined,
    [`recommendationProfile.interactionScores.${newsletterId}`]:
      interactionType === 'view'
        ? { $inc: 1 }
        : interactionType === 'subscribe'
          ? { $inc: 5 }
          : interactionType === 'read'
            ? { $inc: 3 }
            : undefined,
  });

  return docRef.id;
};

// Generate personalized recommendations
export const generatePersonalizedRecommendations = async (
  user: User,
  filters: NewsletterFilter = {}
) => {
  const { topics = user.newsletterPreferences.interestedTopics, pageSize = 12 } = filters;

  // Base recommendation query
  let recommendationQuery = query(
    collection(db, 'newsletters'),
    // Exclude already subscribed newsletters
    where('id', 'not-in', user.recommendationProfile.subscribedNewsletters || [])
  );

  // Filter by user's interested topics
  if (topics && topics.length > 0) {
    recommendationQuery = query(recommendationQuery, where('topics', 'array-contains-any', topics));
  }

  // Sort by recommendation score
  // This would ideally be a more complex algorithm in a real-world scenario
  recommendationQuery = query(
    recommendationQuery,
    orderBy('recommendationMetadata.contentQualityScore', 'desc'),
    orderBy('popularity', 'desc'),
    limit(pageSize)
  );

  const recommendationSnapshot = await getDocs(recommendationQuery);

  return recommendationSnapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Newsletter
  );
};

// Update newsletter recommendation metadata
export const updateNewsletterRecommendationMetadata = async (newsletterId: string) => {
  const newsletterRef = doc(db, 'newsletters', newsletterId);

  // Fetch interaction data
  const interactionsQuery = query(
    collection(db, 'userNewsletterInteractions'),
    where('newsletterId', '==', newsletterId)
  );
  const interactionsSnapshot = await getDocs(interactionsQuery);

  // Calculate recommendation metadata
  const interactions = interactionsSnapshot.docs.map(
    doc => doc.data() as UserNewsletterInteraction
  );

  const topicWeights: Record<string, number> = {};
  let totalInteractions = 0;
  let contentQualityScore = 0;

  interactions.forEach(interaction => {
    totalInteractions++;

    // Weight interactions differently
    const interactionWeight =
      interaction.interactionType === 'subscribe'
        ? 5
        : interaction.interactionType === 'read'
          ? 3
          : interaction.interactionType === 'view'
            ? 1
            : 0;

    // Accumulate topic weights
    // In a real scenario, you'd fetch the newsletter's topics
    // For this example, we'll simulate it
    const newsletterTopics = ['Technology', 'Business']; // Placeholder
    newsletterTopics.forEach(topic => {
      topicWeights[topic] = (topicWeights[topic] || 0) + interactionWeight;
    });

    // Calculate content quality based on interaction duration
    if (interaction.duration) {
      contentQualityScore += interaction.duration;
    }
  });

  // Normalize scores
  Object.keys(topicWeights).forEach(topic => {
    topicWeights[topic] /= totalInteractions;
  });
  contentQualityScore /= totalInteractions;

  // Update newsletter metadata
  await updateDoc(newsletterRef, {
    'recommendationMetadata.topicWeights': topicWeights,
    'recommendationMetadata.contentQualityScore': contentQualityScore,
  });
};

// Find similar newsletters
export const findSimilarNewsletters = async (newsletterId: string) => {
  const newsletterRef = doc(db, 'newsletters', newsletterId);

  // In a real-world scenario, this would use more sophisticated
  // similarity algorithms like collaborative filtering or
  // content-based filtering
  const similarNewslettersQuery = query(
    collection(db, 'newsletters'),
    where('topics', 'array-contains-any', ['Technology', 'Business']), // Placeholder
    limit(5)
  );

  const similarNewslettersSnapshot = await getDocs(similarNewslettersQuery);

  const similarNewsletters = similarNewslettersSnapshot.docs
    .filter(doc => doc.id !== newsletterId)
    .map(doc => doc.id);

  // Update newsletter with similar newsletters
  await updateDoc(newsletterRef, {
    'recommendationMetadata.similarNewsletters': similarNewsletters,
  });

  return similarNewsletters;
};
