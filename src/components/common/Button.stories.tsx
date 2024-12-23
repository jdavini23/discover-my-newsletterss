import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/themes';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'accent'] },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story, context) => {
      const theme = context.parameters.theme === 'dark' ? darkTheme : lightTheme;
      return (
        <ThemeProvider theme={theme}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: theme.colors.background,
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap' 
          }}>
            <Story {...context} />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Button',
    variant: 'accent',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  args: {
    children: 'Dark Theme Button',
  },
};
