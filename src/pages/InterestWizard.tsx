import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../stores/rootStore';
import { useAuth } from '../contexts/AuthContext';

// Define interest categories
const INTEREST_CATEGORIES = [
  { id: 'tech', name: 'Technology', icon: '💻' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'health', name: 'Health & Wellness', icon: '🏥' },
  { id: 'sports', name: 'Sports', icon: '🏀' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'politics', name: 'Politics', icon: '🗳️' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'food', name: 'Food & Cooking', icon: '🍳' },
  { id: 'environment', name: 'Environment', icon: '🌍' },
];

const InterestWizard: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const { user } = useAuth();

  // Ensure user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const toggleInterest = (categoryId: string) => {
    setSelectedInterests(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      addNotification('Please select at least one interest', 'warning');
      return;
    }

    try {
      // TODO: Implement actual backend call to save user interests
      console.log('Saving interests:', selectedInterests);

      addNotification('Interests saved successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      addNotification('Failed to save interests', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Discover Your Interests
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Select the newsletter categories that excite you
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {INTEREST_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => toggleInterest(category.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300
                ${
                  selectedInterests.includes(category.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
                hover:scale-105 hover:shadow-md
              `}
            >
              <span className="text-4xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedInterests.length === 0}
            className={`
              px-6 py-3 rounded-lg text-white font-bold transition-all duration-300
              ${
                selectedInterests.length > 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            Save My Interests
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestWizard;
