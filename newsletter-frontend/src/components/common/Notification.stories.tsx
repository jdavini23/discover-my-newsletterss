import React from 'react';
import { Notification } from './Notification';

/**
 * Notification component for displaying system messages
 * 
 * @component
 * @example
 * // Success notification
 * <Notification 
 *   type="success" 
 *   message="Operation completed successfully" 
 * />
 */
export const SuccessNotification = () => (
  <Notification 
    type="success" 
    message="Newsletter subscribed successfully!" 
  />
);

export const ErrorNotification = () => (
  <Notification 
    type="error" 
    message="Failed to subscribe. Please try again." 
  />
);

export const WarningNotification = () => (
  <Notification 
    type="warning" 
    message="Your subscription is about to expire" 
  />
);

export const InfoNotification = () => (
  <Notification 
    type="info" 
    message="New feature available" 
  />
);

SuccessNotification.ladle = {
  name: 'Success Notification',
  description: 'Notification for successful operations'
};

ErrorNotification.ladle = {
  name: 'Error Notification',
  description: 'Notification for error scenarios'
};

WarningNotification.ladle = {
  name: 'Warning Notification',
  description: 'Notification for warning messages'
};

InfoNotification.ladle = {
  name: 'Info Notification',
  description: 'Notification for informational messages'
};
