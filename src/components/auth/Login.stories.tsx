import type { Story } from '@ladle/react';
import Login from './Login';
import { userEvent, within } from '@storybook/testing-library';
import { createA11yTest, checkColorContrast, testFocusManagement } from '../../utils/a11yTest';

export const Default: Story = () => <Login />;
Default.play = createA11yTest(() => <Login />);

export const AccessibilityTest: Story = () => {
  const loginComponent = <Login />;

  // Check color contrast
  const contrastTest = checkColorContrast('#000000', '#FFFFFF');
  console.log('Color Contrast Pass:', contrastTest);

  // Test focus management
  testFocusManagement(loginComponent);

  return loginComponent;
};

export const FilledForm: Story = () => <Login />;
FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Simulate filling out the form
  await userEvent.type(canvas.getByLabelText(/email/i), 'user@example.com');
  await userEvent.type(canvas.getByLabelText(/password/i), 'StrongPassword123!');
  
  await userEvent.click(canvas.getByRole('button', { name: /log in/i }));
};

export const ErrorState: Story = () => <Login />;
ErrorState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Simulate invalid login attempt
  await userEvent.type(canvas.getByLabelText(/email/i), 'invalidemail');
  await userEvent.type(canvas.getByLabelText(/password/i), 'incorrectpassword');
  
  await userEvent.click(canvas.getByRole('button', { name: /log in/i }));
};

export const LoadingState: Story = () => <Login isLoading={true} />;

export const ForgotPasswordLink: Story = () => <Login />;
ForgotPasswordLink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  const forgotPasswordLink = canvas.getByRole('link', { name: /forgot password/i });
  await userEvent.click(forgotPasswordLink);
};
