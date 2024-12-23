import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type ErrorPageProps = {
  errorCode?: number;
  errorMessage?: string;
  showReturnButton?: boolean;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = 404,
  errorMessage = 'Page Not Found',
  showReturnButton = true,
}) => {
  const errorDetails = {
    404: {
      title: 'Page Not Found',
      description: 'The page you are looking for might have been removed or is temporarily unavailable.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-32 w-32 text-gray-300 dark:text-gray-600 mx-auto mb-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      ),
    },
    500: {
      title: 'Internal Server Error',
      description: 'Something went wrong on our end. Please try again later.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-32 w-32 text-red-300 dark:text-red-600 mx-auto mb-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      ),
    },
    403: {
      title: 'Access Forbidden',
      description: 'You do not have permission to access this page.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-32 w-32 text-yellow-300 dark:text-yellow-600 mx-auto mb-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
          />
        </svg>
      ),
    },
  };

  const currentError = errorDetails[errorCode as keyof typeof errorDetails] || errorDetails[404];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-md w-full text-center">
        {currentError.icon}
        
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {errorCode}
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {currentError.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {currentError.description}
        </p>
        
        {showReturnButton && (
          <div className="flex justify-center space-x-4">
            <button 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Return to Home
            </button>
            <button 
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Contact Support
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof ErrorPage> = {
  title: 'Pages/Error',
  component: ErrorPage,
  tags: ['autodocs'],
  argTypes: {
    errorCode: {
      control: { 
        type: 'select', 
        options: [404, 500, 403] 
      }
    },
    showReturnButton: {
      control: 'boolean'
    }
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const NotFound: Story = {
  args: {
    errorCode: 404,
  },
};

export const ServerError: Story = {
  args: {
    errorCode: 500,
  },
};

export const Forbidden: Story = {
  args: {
    errorCode: 403,
  },
};

export const NoReturnButton: Story = {
  args: {
    errorCode: 404,
    showReturnButton: false,
  },
};
