import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';

export const DefaultDarkModeToggle = () => (
  <DarkModeToggle 
    onToggle={(isDarkMode) => console.log('Dark mode:', isDarkMode)}
  />
);

export const InitiallyDarkMode = () => (
  <DarkModeToggle 
    initialMode="dark"
    onToggle={(isDarkMode) => console.log('Dark mode:', isDarkMode)}
  />
);

export const DisabledDarkModeToggle = () => (
  <DarkModeToggle 
    disabled
    onToggle={(isDarkMode) => console.log('Dark mode:', isDarkMode)}
  />
);

DefaultDarkModeToggle.ladle = {
  name: 'Default Dark Mode Toggle',
  description: 'Standard dark mode toggle switch'
};

InitiallyDarkMode.ladle = {
  name: 'Initially Dark Mode',
  description: 'Dark mode toggle starting in dark mode'
};

DisabledDarkModeToggle.ladle = {
  name: 'Disabled Dark Mode Toggle',
  description: 'Dark mode toggle in disabled state'
};
