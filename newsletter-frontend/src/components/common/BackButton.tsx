import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath = '/newsletters',
  className = '',
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Try to go back to previous page, if not possible, navigate to fallback path
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className={`
        flex items-center justify-center 
        p-2 rounded-full 
        hover:bg-gray-100 
        transition-colors 
        ${className}
      `}
      aria-label="Go back"
    >
      <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
    </button>
  );
};

export default BackButton;
