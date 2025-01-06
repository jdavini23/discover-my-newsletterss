import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4"
      role="alert"
    >
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md text-center">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-700 mb-6">{error.message}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetErrorBoundary}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, onReset }) => {
  const handleError = (error: Error, info: { componentStack: string }) => {
    // Log error to monitoring service
    console.error('Caught an error:', error, info);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        onReset?.();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
