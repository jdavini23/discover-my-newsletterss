import type { Meta, StoryObj } from '@storybook/react';
import { FilterSidebar } from '../components/common/FilterSidebar';

const meta = {
  title: 'Components/FilterSidebar',
  component: FilterSidebar,
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
    onApplyFilters: { action: 'filtersApplied' },
  },
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = [
  { label: 'Technology', value: 'tech' },
  { label: 'Business', value: 'business' },
  { label: 'Science', value: 'science' },
  { label: 'Design', value: 'design' },
];

const tags = [
  { label: 'AI', value: 'ai' },
  { label: 'Startups', value: 'startups' },
  { label: 'Machine Learning', value: 'ml' },
  { label: 'Innovation', value: 'innovation' },
];

export const Default: Story = {
  args: {
    categories,
    tags,
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
