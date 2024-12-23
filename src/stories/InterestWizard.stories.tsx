import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { mockUser } from '../mocks/data';

const InterestCategories = [
  'Technology', 'AI', 'Science', 'Startups', 
  'Design', 'Business', 'Finance', 'Health', 
  'Climate', 'Space', 'Crypto', 'Marketing', 
  'Psychology', 'Art', 'Music', 'Sports'
];

const InterestWizardPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(mockUser.interests);
  const [currentStep, setCurrentStep] = useState(1);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              What topics interest you?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Select at least 3 topics you'd like to receive newsletters about.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {InterestCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleInterest(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 ${
                    selectedInterests.includes(category)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Selected Interests
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
              {selectedInterests.map((interest) => (
                <span 
                  key={interest} 
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These interests will help us personalize your newsletter recommendations.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStep === 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              1
            </div>
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStep === 2 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              2
            </div>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button 
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          
          {currentStep < 2 && selectedInterests.length >= 3 && (
            <button 
              onClick={() => setCurrentStep(prev => Math.min(2, prev + 1))}
              className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          )}

          {currentStep === 2 && (
            <button 
              onClick={() => alert(`Interests saved: ${selectedInterests.join(', ')}`)}
              className="ml-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof InterestWizardPage> = {
  title: 'Pages/Interest Wizard',
  component: InterestWizardPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof InterestWizardPage>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PreselectedInterests: Story = {
  render: () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([
      'Technology', 'AI', 'Startups'
    ]);
    const [currentStep, setCurrentStep] = useState(1);

    // Reuse the same logic as the main component, but with preset interests
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          {/* Similar structure to the main component */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === 1 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                1
              </div>
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep === 2 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                2
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Selected Interests
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
              {selectedInterests.map((interest) => (
                <span 
                  key={interest} 
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These interests will help us personalize your newsletter recommendations.
            </p>
          </div>

          <div className="flex justify-end mt-8">
            <button 
              onClick={() => alert(`Interests saved: ${selectedInterests.join(', ')}`)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    );
  },
};
