import React, { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  tags: FilterOption[];
  onApplyFilters: (filters: { categories: string[], tags: string[] }) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  tags,
  onApplyFilters,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const applyFilters = () => {
    onApplyFilters({
      categories: selectedCategories,
      tags: selectedTags,
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    onApplyFilters({ categories: [], tags: [] });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-72">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Filters
      </h3>

      {/* Categories Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label 
              key={category.value} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(category.value)}
                onChange={() => toggleCategory(category.value)}
                className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
          Tags
        </h4>
        <div className="space-y-2">
          {tags.map((tag) => (
            <label 
              key={tag.value} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input 
                type="checkbox" 
                checked={selectedTags.includes(tag.value)}
                onChange={() => toggleTag(tag.value)}
                className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-500 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {tag.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button 
          onClick={applyFilters}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
        <button 
          onClick={clearFilters}
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
