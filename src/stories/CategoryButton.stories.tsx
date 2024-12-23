import type { Meta, StoryObj } from '@storybook/react';
import { CategoryButton } from '../components/common/CategoryButton';

const meta = {
  title: 'Components/CategoryButton',
  component: CategoryButton,
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
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof CategoryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Technology',
  },
};

export const Active: Story = {
  args: {
    label: 'Technology',
    isActive: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Technology',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
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
