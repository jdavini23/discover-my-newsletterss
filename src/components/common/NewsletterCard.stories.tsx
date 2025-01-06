import React from 'react';
import { NewsletterCard } from './NewsletterCard';

/**
 * NewsletterCard component for displaying newsletter details
 *
 * @component
 * @example
 * // Basic usage
 * <NewsletterCard
 *   title="Tech Weekly"
 *   description="Latest tech news and insights"
 *   imageUrl="/path/to/image.jpg"
 * />
 */
export const DefaultNewsletterCard = () => (
  <NewsletterCard
    title="Tech Weekly"
    description="Latest tech news and insights"
    imageUrl="https://via.placeholder.com/150"
    tags={['Technology', 'Innovation']}
    subscriberCount={5000}
    onSubscribe={() => console.log('Subscribed to Tech Weekly')}
  />
);

export const PopularNewsletterCard = () => (
  <NewsletterCard
    title="Science Digest"
    description="Cutting-edge scientific discoveries"
    imageUrl="https://via.placeholder.com/150"
    tags={['Science', 'Research']}
    subscriberCount={25000}
    popular
    onSubscribe={() => console.log('Subscribed to Science Digest')}
  />
);

export const SubscribedNewsletterCard = () => (
  <NewsletterCard
    title="Business Insider"
    description="Global business trends and analysis"
    imageUrl="https://via.placeholder.com/150"
    tags={['Business', 'Finance']}
    subscriberCount={15000}
    subscribed
    onSubscribe={() => console.log('Unsubscribed from Business Insider')}
  />
);

DefaultNewsletterCard.ladle = {
  name: 'Default Newsletter Card',
  description: 'Standard newsletter card with basic information',
};

PopularNewsletterCard.ladle = {
  name: 'Popular Newsletter Card',
  description: 'Newsletter card marked as popular',
};

SubscribedNewsletterCard.ladle = {
  name: 'Subscribed Newsletter Card',
  description: 'Newsletter card in subscribed state',
};
