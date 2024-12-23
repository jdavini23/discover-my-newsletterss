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

const InterestWizard: React.FC = () => {
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
      console.error('Error in handleSubmit:', error);
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
          <div key={category.category} className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.interests.map((interest, _index) => (
                <Tooltip key={interest} content={`Select ${interest}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInterestSelect(interest)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } `}
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
      className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Discover Your Perfect Newsletters</h2>

      <AnimatePresence>{renderedInterestCategories}</AnimatePresence>

      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
          className={`rounded-lg px-6 py-3 font-bold text-white transition-all ${
            selectedInterests.length > 0
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'cursor-not-allowed bg-gray-400'
          } `}
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

export default InterestWizard;
