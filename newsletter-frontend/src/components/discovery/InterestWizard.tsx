import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../../stores/rootStore';
import { useNotificationStore } from '../../stores/rootStore';
import { Tooltip } from '../common/Tooltip';

// Mock interests - replace with actual backend call
const INTERESTS_CATEGORIES = [
  { 
    category: 'Technology', 
    interests: ['AI', 'Web Development', 'Cybersecurity', 'Blockchain', 'Cloud Computing'] 
  },
  { 
    category: 'Business', 
    interests: ['Startups', 'Entrepreneurship', 'Finance', 'Marketing', 'Leadership'] 
  },
  { 
    category: 'Science', 
    interests: ['Space', 'Biology', 'Climate Change', 'Neuroscience', 'Quantum Physics'] 
  },
  { 
    category: 'Arts & Culture', 
    interests: ['Film', 'Literature', 'Music', 'Design', 'Photography'] 
  }
];

export const InterestWizard: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const { addNotification } = useNotificationStore();
  const { user, setUser } = useUserStore();

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    try {
      // TODO: Replace with actual API call to save user interests
      console.log('Selected Interests:', selectedInterests);
      
      // Simulated backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification({
        message: 'Interests updated successfully!',
        type: 'success'
      });

      // Update user preferences in store
      setUser({ preferences: selectedInterests });
    } catch (error) {
      addNotification({
        message: 'Failed to update interests',
        type: 'error'
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Discover Your Perfect Newsletters
      </h2>

      <AnimatePresence>
        {INTERESTS_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.interests.map(interest => (
                <Tooltip key={interest} content={`Select ${interest}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInterestToggle(interest)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${selectedInterests.includes(interest) 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    {interest}
                  </motion.button>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
          className={`
            px-6 py-3 rounded-lg text-white font-bold transition-all
            ${selectedInterests.length > 0 
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
