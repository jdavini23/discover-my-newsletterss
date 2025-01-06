import type { Story } from '@ladle/react';
import SearchFilters from './SearchFilters';
import { userEvent, within } from '@storybook/testing-library';

export const Default: Story = () => <SearchFilters onApplyFilters={() => {}} />;

export const SelectedFilters: Story = () => (
  <SearchFilters
    onApplyFilters={() => {}}
    initialFilters={{
      categories: ['Technology', 'Business'],
      frequency: ['Weekly'],
      priceRange: [0, 50],
    }}
  />
);

export const ManyCategories: Story = () => (
  <SearchFilters
    onApplyFilters={() => {}}
    categories={[
      'Technology',
      'Business',
      'Design',
      'Marketing',
      'Finance',
      'Health',
      'Science',
      'Arts',
      'Sports',
    ]}
  />
);

export const InteractiveFiltering: Story = () => <SearchFilters onApplyFilters={() => {}} />;
InteractiveFiltering.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Select a category
  const technologyCheckbox = canvas.getByLabelText(/technology/i);
  await userEvent.click(technologyCheckbox);

  // Adjust price range
  const priceSlider = canvas.getByRole('slider');
  await userEvent.move(priceSlider, { clientX: 100, clientY: 0 });

  // Apply filters
  const applyButton = canvas.getByRole('button', { name: /apply filters/i });
  await userEvent.click(applyButton);
};

export const EmptyState: Story = () => (
  <SearchFilters onApplyFilters={() => {}} categories={[]} frequencies={[]} />
);

export const DisabledState: Story = () => (
  <SearchFilters onApplyFilters={() => {}} disabled={true} />
);
