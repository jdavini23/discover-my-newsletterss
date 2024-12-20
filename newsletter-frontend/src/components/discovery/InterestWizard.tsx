import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../../stores/rootStore';
import { Tooltip } from '../common/Tooltip';

// Memoize interest categories to prevent unnecessary re-renders
const interestCategories = [
  {
    category: 'Technology',
    interests: ['AI', 'Web Development', 'Cybersecurity', 'Blockchain', 'Cloud Computing'],
  },
  {
    category: 'Business',
    interests: ['Startups', 'Entrepreneurship', 'Finance', 'Marketing', 'Leadership'],
  },
  {
    category: 'Science',
    interests: ['Space', 'Biology', 'Climate Change', 'Neuroscience', 'Quantum Physics'],
  },
  {
    category: 'Arts & Culture',
    interests: ['Film', 'Literature', 'Music', 'Design', 'Photography'],
  },
];

export const InterestWizard: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { addNotification } = useNotificationStore();

  // Memoize interest selection handler to prevent unnecessary re-renders
  const handleInterestSelect = useCallback((interest: string) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  }, []);

  // Memoize submit handler
  const handleSubmit = useCallback(async () => {
    try {
      // Simulated API call or store update
      await updateUserInterests(selectedInterests);

      addNotification({
        message: 'Interests updated successfully!',
        type: 'success',
      });
    } catch (error) {
      addNotification({
        message: 'Failed to update interests',
        type: 'error',
      });
    }
  }, [selectedInterests, addNotification]);

  // Memoize rendered interests to optimize performance
  const renderedInterestCategories = useMemo(
    () => (
      <div className="space-y-6">
        {interestCategories.map((category) => (
          <div key={category.category} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.interests.map((interest, _index) => (
                <Tooltip key={interest} content={`Select ${interest}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInterestSelect(interest)}
                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${
                      selectedInterests.includes(interest)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                  >
                    {interest}
                  </motion.button>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    [interestCategories, selectedInterests, handleInterestSelect]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Discover Your Perfect Newsletters</h2>

      <AnimatePresence>{renderedInterestCategories}</AnimatePresence>

      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
          className={`
            px-6 py-3 rounded-lg text-white font-bold transition-all
            ${
              selectedInterests.length > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          Save My Interests
        </motion.button>
      </div>
    </motion.div>
  );
};

// Simulated API function (replace with actual implementation)
async function updateUserInterests(interests: string[]) {
  // Placeholder for actual API call or store update
  console.log('Updating user interests:', interests);
  return Promise.resolve();
}