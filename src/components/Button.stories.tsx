import React from 'react';
import { Button } from './Button'; // Assuming you have a Button component

export const Primary = () => <Button variant="primary">Primary Button</Button>;
export const Secondary = () => <Button variant="secondary">Secondary Button</Button>;
export const Disabled = () => <Button disabled>Disabled Button</Button>;

Primary.ladle = {
  name: 'Primary Button',
  description: 'A primary action button',
};

Secondary.ladle = {
  name: 'Secondary Button',
  description: 'A secondary action button',
};

Disabled.ladle = {
  name: 'Disabled Button',
  description: 'A button in disabled state',
};
