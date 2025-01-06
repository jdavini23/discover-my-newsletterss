import type { Story } from '@ladle/react';
import React from 'react';

/**
 * Typography Style Guide
 * 
 * This guide documents the typography system used across the application.
 * It provides a comprehensive overview of font sizes, weights, and usage guidelines.
 */
export const TypographyGuide: Story = () => (
  <div className="p-8 space-y-8">
    <section>
      <h1 className="text-4xl font-bold mb-4">Typography System</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Headings</h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">H1 - Main Heading</h1>
            <h2 className="text-4xl font-semibold">H2 - Section Heading</h2>
            <h3 className="text-3xl font-medium">H3 - Subsection Heading</h3>
            <h4 className="text-2xl font-normal">H4 - Small Heading</h4>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Body Text</h2>
          <div className="space-y-4">
            <p className="text-lg font-normal">Large Body Text (lg)</p>
            <p className="text-base font-normal">Default Body Text (base)</p>
            <p className="text-sm font-normal">Small Body Text (sm)</p>
            <p className="text-xs font-normal">Extra Small Text (xs)</p>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <h2 className="text-2xl font-semibold mb-4">Font Weights</h2>
      <div className="grid grid-cols-4 gap-4">
        {['Thin', 'Light', 'Normal', 'Medium', 'Semibold', 'Bold'].map((weight) => (
          <div key={weight} className="border p-4">
            <p className={`text-base font-${weight.toLowerCase()}`}>
              {weight} - {weight === 'Normal' ? 'Regular' : weight}
            </p>
          </div>
        ))}
      </div>
    </section>
    
    <section>
      <h2 className="text-2xl font-semibold mb-4">Developer Guidelines</h2>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">Typography Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use semantic HTML tags for headings (h1, h2, etc.)</li>
          <li>Maintain a clear hierarchy in text sizes</li>
          <li>Avoid using font sizes smaller than 12px for readability</li>
          <li>Use font-weight to create visual distinction</li>
          <li>Ensure sufficient color contrast</li>
        </ul>
      </div>
    </section>
  </div>
);

TypographyGuide.parameters = {
  docs: {
    description: {
      component: 'A comprehensive guide to the application\'s typography system, showcasing font sizes, weights, and usage guidelines.'
    }
  }
};

export const FontSizeComparison: Story = () => (
  <div className="p-8 space-y-4">
    <h2 className="text-2xl font-semibold mb-4">Font Size Comparison</h2>
    {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map((size) => (
      <div key={size} className="flex items-center space-x-4">
        <span className="w-16 text-gray-600">{size}</span>
        <p className={`text-${size}`}>The quick brown fox jumps over the lazy dog</p>
      </div>
    ))}
  </div>
);

export const TextStyleVariants: Story = () => (
  <div className="p-8 space-y-4">
    <h2 className="text-2xl font-semibold mb-4">Text Style Variants</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-xl mb-2">Regular Variants</h3>
        <p className="text-primary">Primary Color Text</p>
        <p className="text-secondary">Secondary Color Text</p>
        <p className="text-muted">Muted Text</p>
      </div>
      <div>
        <h3 className="text-xl mb-2">Emphasis Variants</h3>
        <p className="font-bold">Bold Text</p>
        <p className="font-semibold">Semi-Bold Text</p>
        <p className="italic">Italic Text</p>
        <p className="underline">Underlined Text</p>
      </div>
    </div>
  </div>
);
