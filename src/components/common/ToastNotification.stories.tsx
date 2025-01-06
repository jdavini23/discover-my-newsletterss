import type { Story } from '@ladle/react';
import ToastNotification from './ToastNotification';

export const SuccessToast: Story = () => (
  <ToastNotification 
    type="success" 
    message="Your newsletter has been successfully saved!" 
  />
);

export const ErrorToast: Story = () => (
  <ToastNotification 
    type="error" 
    message="Failed to save newsletter. Please try again." 
  />
);

export const WarningToast: Story = () => (
  <ToastNotification 
    type="warning" 
    message="You have unsaved changes." 
  />
);

export const InfoToast: Story = () => (
  <ToastNotification 
    type="info" 
    message="New features are now available!" 
  />
);

export const LongMessageToast: Story = () => (
  <ToastNotification 
    type="success" 
    message="This is a very long toast notification message that demonstrates how the component handles extended text content with multiple lines of information." 
  />
);

export const MultipleToasts: Story = () => (
  <div>
    <ToastNotification 
      type="success" 
      message="First notification" 
    />
    <ToastNotification 
      type="error" 
      message="Second notification" 
    />
    <ToastNotification 
      type="warning" 
      message="Third notification" 
    />
  </div>
);
