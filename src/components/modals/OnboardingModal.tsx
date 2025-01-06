import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl max-w-md w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Newsletter Discovery!</h2>

        <div className="space-y-4 text-gray-600">
          <p>
            Discover personalized newsletters tailored to your interests. Our AI-powered
            recommendation system helps you find the most relevant and engaging content.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">How It Works</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Browse newsletters across various categories</li>
              <li>Get personalized recommendations</li>
              <li>Subscribe to newsletters that match your interests</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500">
            You can always adjust your preferences in your profile settings.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Exploring
        </button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingModal;
