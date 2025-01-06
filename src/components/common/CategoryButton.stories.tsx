import React from 'react';
import { CategoryButton } from './CategoryButton';

/**
 * CategoryButton component for selecting newsletter categories
 *
 * @component
 * @example
 * // Basic usage
 * <CategoryButton
 *   category="Technology"
 *   isSelected={false}
 *   onSelect={() => handleCategorySelect('Technology')}
 * />
 */
export const DefaultCategoryButton = () => (
  <CategoryButton
    category="Technology"
    isSelected={false}
    onSelect={() => console.log('Technology category selected')}
  />
);

export const SelectedCategoryButton = () => (
  <CategoryButton
    category="Science"
    isSelected={true}
    onSelect={() => console.log('Science category selected')}
  />
);

export const DisabledCategoryButton = () => (
  <CategoryButton
    category="Sports"
    isSelected={false}
    disabled
    onSelect={() => console.log('Sports category selected')}
  />
);

DefaultCategoryButton.ladle = {
  name: 'Default Category Button',
  description: 'Unselected category button',
};

SelectedCategoryButton.ladle = {
  name: 'Selected Category Button',
  description: 'Category button in selected state',
};

DisabledCategoryButton.ladle = {
  name: 'Disabled Category Button',
  description: 'Category button in disabled state',
};
