import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NewsletterCard } from '../components/common/NewsletterCard';

const meta = {
  title: 'Components/NewsletterCard',
  component: NewsletterCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a202c' },
      ],
    },
  },
  argTypes: {
    onFavorite: { action: 'favorited' },
  },
} satisfies Meta<typeof NewsletterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Tech Insights Weekly',
    description: 'A curated newsletter delivering the latest trends in technology, startup innovations, and digital transformation.',
    imageUrl: 'https://via.placeholder.com/350x200?text=Tech+Newsletter',
    tags: ['Technology', 'Startups', 'Innovation'],
    subscriptionCount: 45000,
  },
};

export const WithoutImage: Story = {
  args: {
    ...Default.args,
    imageUrl: undefined,
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: 'The Comprehensive Guide to Emerging Technologies and Their Impact on Global Industries',
    description: 'An in-depth exploration of cutting-edge technologies, their potential applications, and how they are reshaping industries from healthcare and finance to manufacturing and entertainment. This newsletter provides expert analysis, case studies, and forward-looking insights that help professionals stay ahead of the curve.',
    tags: ['Technology', 'Innovation', 'Digital Transformation', 'AI', 'Machine Learning', 'Blockchain'],
    subscriptionCount: 120000,
  },
};

export const Favorited: Story = {
  args: {
    ...Default.args,
    isFavorite: true,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    ...Default.args,
  },
};
