import React from 'react';

interface CategoryButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  isActive = false,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${
          isActive
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
