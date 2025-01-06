import React from 'react';
import { Button } from './Button';

export const PrimaryButton = () => (
  <Button variant="primary" onClick={() => console.log('Primary button clicked')}>
    Primary Action
  </Button>
);

export const SecondaryButton = () => (
  <Button variant="secondary" onClick={() => console.log('Secondary button clicked')}>
    Secondary Action
  </Button>
);

export const DisabledButton = () => (
  <Button disabled onClick={() => console.log('Disabled button clicked')}>
    Disabled Button
  </Button>
);

PrimaryButton.ladle = {
  name: 'Primary Button',
  description: 'Primary action button',
};

SecondaryButton.ladle = {
  name: 'Secondary Button',
  description: 'Secondary action button',
};

DisabledButton.ladle = {
  name: 'Disabled Button',
  description: 'Button in disabled state',
};
