import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../components/common/SearchBar';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
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
    onSearch: { action: 'searched' },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search newsletters by topic or interest',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Find your next favorite newsletter',
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
