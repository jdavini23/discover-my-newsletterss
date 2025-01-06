import type { Story } from '@ladle/react';
import SavedNewslettersList from './SavedNewslettersList';
import { Newsletter } from '../../types/newsletter';

const mockNewsletters: Newsletter[] = [
  {
    id: '1',
    title: 'Tech Insider',
    description: 'Latest trends in technology and innovation',
    author: 'John Doe',
    categories: ['Technology'],
    frequency: 'Weekly',
    subscribers: 50000,
    url: 'https://techinsider.com',
    price: { amount: 0, currency: '$', interval: 'monthly' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Business Horizons',
    description: 'In-depth business and market analysis',
    author: 'Jane Smith',
    categories: ['Business'],
    frequency: 'Monthly',
    subscribers: 75000,
    url: 'https://businesshorizons.com',
    price: { amount: 10, currency: '$', interval: 'monthly' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const Default: Story = () => <SavedNewslettersList newsletters={mockNewsletters} />;

export const EmptyState: Story = () => <SavedNewslettersList newsletters={[]} />;

export const ManyNewsletters: Story = () => (
  <SavedNewslettersList
    newsletters={[
      ...mockNewsletters,
      ...mockNewsletters.map((nl, index) => ({
        ...nl,
        id: `duplicate-${index}`,
        title: `Duplicate ${nl.title}`,
      })),
    ]}
  />
);

export const LongTitlesAndDescriptions: Story = () => (
  <SavedNewslettersList
    newsletters={mockNewsletters.map((newsletter) => ({
      ...newsletter,
      title: 'A Very Long Newsletter Title That Goes On and On and On',
      description:
        'An extremely long description that provides extensive details about the newsletter, its content, its mission, and its incredible value to readers who are interested in learning more about this particular publication.',
    }))}
  />
);
