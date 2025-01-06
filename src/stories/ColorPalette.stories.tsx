import type { Story } from '@ladle/react';
import React from 'react';

// Color palette based on Tailwind's default colors with custom modifications
const colorPalette = {
  primary: {
    light: '#3B82F6',  // Blue
    dark: '#2563EB'
  },
  secondary: {
    light: '#10B981',  // Green
    dark: '#059669'
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  },
  semantic: {
    success: {
      light: '#10B981',
      dark: '#059669'
    },
    error: {
      light: '#EF4444',
      dark: '#DC2626'
    },
    warning: {
      light: '#F59E0B',
      dark: '#D97706'
    },
    info: {
      light: '#3B82F6',
      dark: '#2563EB'
    }
  }
};

/**
 * Color Palette Style Guide
 * 
 * Comprehensive documentation of the application's color system,
 * including light and dark theme variations, semantic colors, 
 * and usage guidelines.
 */
export const ColorPaletteGuide: Story = () => (
  <div className="p-8 space-y-8">
    <section>
      <h1 className="text-4xl font-bold mb-4">Color Palette</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Primary and Secondary Colors */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Core Colors</h2>
          <div className="space-y-4">
            {Object.entries(colorPalette).filter(([key]) => ['primary', 'secondary'].includes(key)).map(([name, colors]) => (
              <div key={name} className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg" 
                  style={{ backgroundColor: colors.light }}
                />
                <div>
                  <p className="font-semibold capitalize">{name} Light</p>
                  <p className="text-sm text-gray-600">{colors.light}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Semantic Colors */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Semantic Colors</h2>
          <div className="space-y-4">
            {Object.entries(colorPalette.semantic).map(([name, colors]) => (
              <div key={name} className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg" 
                  style={{ backgroundColor: colors.light }}
                />
                <div>
                  <p className="font-semibold capitalize">{name}</p>
                  <p className="text-sm text-gray-600">{colors.light}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    
    {/* Neutral Color Scale */}
    <section>
      <h2 className="text-2xl font-semibold mb-4">Neutral Color Scale</h2>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(colorPalette.neutral).map(([key, color]) => (
          <div key={key} className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-lg" 
              style={{ backgroundColor: color }}
            />
            <p className="text-sm mt-2">Neutral {key}</p>
          </div>
        ))}
      </div>
    </section>
    
    {/* Color Usage Guidelines */}
    <section>
      <h2 className="text-2xl font-semibold mb-4">Developer Guidelines</h2>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">Color Usage Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use semantic colors for consistent meaning across the app</li>
          <li>Maintain sufficient color contrast (WCAG AA standard)</li>
          <li>Use neutral colors for backgrounds and text</li>
          <li>Limit the number of colors in your design</li>
          <li>Consider color blindness and accessibility</li>
        </ul>
      </div>
    </section>
  </div>
);

ColorPaletteGuide.parameters = {
  docs: {
    description: {
      component: 'Comprehensive color palette showcasing the application\'s design system with light and dark theme variations.'
    }
  }
};

// Color Contrast Demonstration
export const ColorContrastDemo: Story = () => (
  <div className="p-8 space-y-4">
    <h2 className="text-2xl font-semibold mb-4">Color Contrast Examples</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-xl mb-2">Good Contrast</h3>
        <div 
          className="p-4 rounded text-white" 
          style={{ backgroundColor: colorPalette.primary.light }}
        >
          White text on primary color
        </div>
      </div>
      <div>
        <h3 className="text-xl mb-2">Poor Contrast (Avoid)</h3>
        <div 
          className="p-4 rounded" 
          style={{ 
            backgroundColor: colorPalette.neutral[100],
            color: colorPalette.neutral[200]
          }}
        >
          Low contrast text
        </div>
      </div>
    </div>
  </div>
);
