import type { Story } from '@ladle/react';
import EditProfileForm from './EditProfileForm';
import { userEvent, within } from '@storybook/testing-library';
import { createA11yTest, checkColorContrast, testFocusManagement } from '../../utils/a11yTest';

const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  interests: ['Technology', 'Business'],
  notificationPreferences: {
    email: true,
    push: false,
    frequency: 'weekly',
  },
};

export const Default: Story = () => (
  <EditProfileForm initialData={initialUserData} onSubmit={() => {}} />
);
Default.play = createA11yTest(() => (
  <EditProfileForm initialData={initialUserData} onSubmit={() => {}} />
));

export const AccessibilityTest: Story = () => {
  // Demonstrate color contrast and focus management
  const form = <EditProfileForm initialData={initialUserData} onSubmit={() => {}} />;

  // Check color contrast
  const contrastTest = checkColorContrast('#000000', '#FFFFFF');
  console.log('Color Contrast Pass:', contrastTest);

  // Test focus management
  testFocusManagement(form);

  return form;
};

export const FilledForm: Story = () => (
  <EditProfileForm initialData={initialUserData} onSubmit={() => {}} />
);
FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Modify some fields
  await userEvent.clear(canvas.getByLabelText(/name/i));
  await userEvent.type(canvas.getByLabelText(/name/i), 'Jane Smith');

  await userEvent.click(canvas.getByLabelText(/design/i));
  await userEvent.click(canvas.getByLabelText(/marketing/i));
};

export const ValidationErrors: Story = () => (
  <EditProfileForm initialData={initialUserData} onSubmit={() => {}} />
);
ValidationErrors.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Clear required fields
  await userEvent.clear(canvas.getByLabelText(/name/i));
  await userEvent.clear(canvas.getByLabelText(/email/i));

  // Attempt to submit
  const submitButton = canvas.getByRole('button', { name: /save changes/i });
  await userEvent.click(submitButton);
};

export const LoadingState: Story = () => (
  <EditProfileForm initialData={initialUserData} onSubmit={() => {}} isLoading={true} />
);

export const LongInputs: Story = () => (
  <EditProfileForm
    initialData={{
      ...initialUserData,
      name: 'A Very Long Name That Demonstrates How the Form Handles Extremely Long Input Strings',
      email: 'verylongemailaddressthatgoesonforseveralcharacters@extremelylongdomainname.com',
    }}
    onSubmit={() => {}}
  />
);

export const ManyInterests: Story = () => (
  <EditProfileForm
    initialData={{
      ...initialUserData,
      interests: [
        'Technology',
        'Business',
        'Design',
        'Marketing',
        'Finance',
        'Health',
        'Science',
        'Arts',
        'Sports',
        'Education',
        'Politics',
        'Travel',
      ],
    }}
    onSubmit={() => {}}
  />
);
