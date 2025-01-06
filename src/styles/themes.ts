import { DefaultTheme } from 'styled-components';

// Color Palette
const COLORS = {
  primary: {
    light: '#3182ce',   // Blue for light theme
    dark: '#63b3ed',    // Lighter blue for dark theme
  },
  secondary: {
    light: '#38a169',   // Green for light theme
    dark: '#48bb78',    // Lighter green for dark theme
  },
  background: {
    light: '#ffffff',   // White
    dark: '#1a202c',    // Dark blue-gray
  },
  text: {
    light: '#2d3748',   // Dark gray for light theme
    dark: '#e2e8f0',    // Light gray for dark theme
  },
  accent: {
    light: '#ed64a6',   // Pink for light theme
    dark: '#f687b3',    // Lighter pink for dark theme
  }
};

// Typography
const TYPOGRAPHY = {
  fontFamily: "'Inter', sans-serif",
  fontSize: {
    small: '0.875rem',
    base: '1rem',
    large: '1.25rem',
    heading: '1.5rem'
  },
  lineHeight: {
    normal: 1.5,
    tight: 1.25,
    loose: 2
  }
};

// Spacing System
const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
};

// Border Radius
const BORDER_RADIUS = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px'
};

// Light Theme
export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    primary: COLORS.primary.light,
    secondary: COLORS.secondary.light,
    background: COLORS.background.light,
    text: COLORS.text.light,
    accent: COLORS.accent.light,
  },
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
};

// Dark Theme
export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    primary: COLORS.primary.dark,
    secondary: COLORS.secondary.dark,
    background: COLORS.background.dark,
    text: COLORS.text.dark,
    accent: COLORS.accent.dark,
  },
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
};

// Theme Types
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        small: string;
        base: string;
        large: string;
        heading: string;
      };
      lineHeight: {
        normal: number;
        tight: number;
        loose: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
  }
}
