import type { Story } from '@ladle/react';
import Signup from './Signup';
import { userEvent, within } from '@storybook/testing-library';

export const Default: Story = () => <Signup />;

export const FilledForm: Story = () => <Signup />;
FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Simulate filling out the form
  await userEvent.type(canvas.getByLabelText(/email/i), 'user@example.com');
  await userEvent.type(canvas.getByLabelText(/password/i), 'StrongPassword123!');
  await userEvent.type(canvas.getByLabelText(/confirm password/i), 'StrongPassword123!');
  
  await userEvent.click(canvas.getByRole('button', { name: /sign up/i }));
};

export const ErrorState: Story = () => <Signup />;
ErrorState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Simulate invalid form submission
  await userEvent.type(canvas.getByLabelText(/email/i), 'invalidemail');
  await userEvent.type(canvas.getByLabelText(/password/i), 'weak');
  
  await userEvent.click(canvas.getByRole('button', { name: /sign up/i }));
};

export const LoadingState: Story = () => <Signup isLoading={true} />;

export const DisabledSubmit: Story = () => <Signup />;
DisabledSubmit.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const submitButton = canvas.getByRole('button', { name: /sign up/i });
  expect(submitButton).toBeDisabled();
};
