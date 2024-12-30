import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  getDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  Query,
  DocumentSnapshot,
  increment
} from 'firebase/firestore';
import { auth } from '@/config/firebase';
import { User, Newsletter, Subscription, NewsletterFilter } from '@/types/firestore';

const db = getFirestore();

// User-related Firestore operations
export const createUserProfile = async (user: Partial<User>) => {
  if (!user.id) throw new Error('User ID is required');

  const userRef = doc(db, 'users', user.id);
  await setDoc(userRef, {
    email: user.email,
    displayName: user.displayName || '',
    createdAt: Timestamp.now()
  }, { merge: true });
};

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error('User profile not found');
  }

  return {
    id: userSnap.id,
    ...userSnap.data()
  } as User;
};

// Update user profile
export const updateUserProfile = async (
  userId: string, 
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
) => {
  if (!userId) throw new Error('User ID is required');

  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, updates);
};

// Update user newsletter preferences
export const updateNewsletterPreferences = async (
  userId: string, 
  preferences: User['newsletterPreferences']
) => {
  if (!userId) throw new Error('User ID is required');

  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    newsletterPreferences: preferences
  });
};

// Fetch available newsletter topics
export const fetchAvailableTopics = async () => {
  const topicsRef = collection(db, 'topics');
  const topicsSnapshot = await getDocs(topicsRef);
  
  return topicsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Newsletter-related Firestore operations
export const addNewsletter = async (newsletter: Omit<Newsletter, 'id'>) => {
  if (!auth.currentUser) throw new Error('No authenticated user');

  const newsletterRef = collection(db, 'newsletters');
  const docRef = await addDoc(newsletterRef, {
    ...newsletter,
    userId: auth.currentUser.uid,
    createdAt: Timestamp.now()
  });

  return docRef.id;
};

export const getUserNewsletters = async () => {
  if (!auth.currentUser) throw new Error('No authenticated user');

  const newsletterRef = collection(db, 'newsletters');
  const q = query(newsletterRef, where('userId', '==', auth.currentUser.uid));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Newsletter));
};

// Newsletter Discovery Methods
export const fetchNewsletters = async (filters: NewsletterFilter = {}) => {
  const { 
    topics, 
    sortBy = 'popularity', 
    searchQuery, 
    page = 1, 
    pageSize = 12 
  } = filters;

  // Base query
  let newsletterQuery: Query = collection(db, 'newsletters');

  // Apply topic filters
  if (topics && topics.length > 0) {
    newsletterQuery = query(
      newsletterQuery, 
      where('topics', 'array-contains-any', topics)
    );
  }

  // Apply search query
  if (searchQuery) {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation and might need more sophisticated indexing
    newsletterQuery = query(
      newsletterQuery,
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff')
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'popularity':
      newsletterQuery = query(
        newsletterQuery, 
        orderBy('popularity', 'desc')
      );
      break;
    case 'recent':
      newsletterQuery = query(
        newsletterQuery, 
        orderBy('createdAt', 'desc')
      );
      break;
    case 'rating':
      newsletterQuery = query(
        newsletterQuery, 
        orderBy('averageRating', 'desc')
      );
      break;
  }

  // Apply pagination
  newsletterQuery = query(
    newsletterQuery,
    limit(pageSize)
  );

  const newsletterSnapshot = await getDocs(newsletterQuery);
  
  return newsletterSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Newsletter));
};

// Subscribe to a newsletter
export const subscribeToNewsletter = async (newsletterId: string) => {
  if (!auth.currentUser) throw new Error('No authenticated user');

  const subscriptionRef = collection(db, 'subscriptions');
  
  // Create subscription
  const subscriptionDoc = await addDoc(subscriptionRef, {
    userId: auth.currentUser.uid,
    newsletterId,
    subscribedAt: Timestamp.now()
  });

  // Increment newsletter subscriber count
  const newsletterRef = doc(db, 'newsletters', newsletterId);
  await updateDoc(newsletterRef, {
    subscriberCount: increment(1)
  });

  return subscriptionDoc.id;
};

// Unsubscribe from a newsletter
export const unsubscribeFromNewsletter = async (newsletterId: string) => {
  if (!auth.currentUser) throw new Error('No authenticated user');

  // Find and delete the subscription
  const subscriptionsQuery = query(
    collection(db, 'subscriptions'),
    where('userId', '==', auth.currentUser.uid),
    where('newsletterId', '==', newsletterId)
  );

  const subscriptionSnapshot = await getDocs(subscriptionsQuery);
  
  if (!subscriptionSnapshot.empty) {
    const subscriptionDoc = subscriptionSnapshot.docs[0];
    await deleteDoc(doc(db, 'subscriptions', subscriptionDoc.id));

    // Decrement newsletter subscriber count
    const newsletterRef = doc(db, 'newsletters', newsletterId);
    await updateDoc(newsletterRef, {
      subscriberCount: increment(-1)
    });
  }
};

// Get user's subscribed newsletters
export const fetchUserSubscriptions = async () => {
  if (!auth.currentUser) throw new Error('No authenticated user');

  const subscriptionsQuery = query(
    collection(db, 'subscriptions'),
    where('userId', '==', auth.currentUser.uid)
  );

  const subscriptionSnapshot = await getDocs(subscriptionsQuery);
  
  // Get full newsletter details for each subscription
  const subscriptions = await Promise.all(
    subscriptionSnapshot.docs.map(async (subDoc) => {
      const newsletterId = subDoc.data().newsletterId;
      const newsletterDoc = await getDoc(doc(db, 'newsletters', newsletterId));
      
      return {
        id: newsletterId,
        ...newsletterDoc.data(),
        subscriptionId: subDoc.id
      } as Newsletter & { subscriptionId: string };
    })
  );

  return subscriptions;
};
