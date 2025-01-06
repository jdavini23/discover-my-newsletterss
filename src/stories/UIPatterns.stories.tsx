import type { Story } from '@ladle/react';
import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Tooltip from '../components/common/Tooltip';

/**
 * UI Patterns Style Guide
 *
 * Comprehensive documentation of reusable UI components,
 * their variations, states, and usage guidelines.
 */
export const UIPatternGuide: Story = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">UI Component Patterns</h1>

        {/* Buttons */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="flex space-x-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Button Usage Guidelines</h3>
            <ul className="list-disc pl-5">
              <li>Use primary buttons for main actions</li>
              <li>Use secondary buttons for alternative actions</li>
              <li>Maintain consistent sizing and padding</li>
              <li>Provide clear visual feedback on interaction</li>
            </ul>
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Input Fields</h2>
          <div className="space-y-4 max-w-md">
            <Input label="Default Input" placeholder="Enter text" />
            <Input label="Disabled Input" placeholder="Cannot be edited" disabled />
            <Input label="Input with Error" placeholder="Error state" error="Invalid input" />
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Input Field Best Practices</h3>
            <ul className="list-disc pl-5">
              <li>Always provide clear labels</li>
              <li>Use placeholder text for hints</li>
              <li>Show validation errors inline</li>
              <li>Ensure sufficient touch/click targets</li>
            </ul>
          </div>
        </div>

        {/* Modals */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Modals</h2>
          <Button onClick={() => setIsModalOpen(true)}>Open Example Modal</Button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal">
            <p>This is an example of a modal dialog with content.</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </Modal>

          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Modal Design Guidelines</h3>
            <ul className="list-disc pl-5">
              <li>Use modals for critical interactions</li>
              <li>Provide clear close mechanisms</li>
              <li>Trap focus within the modal</li>
              <li>Support keyboard navigation</li>
            </ul>
          </div>
        </div>

        {/* Tooltips */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tooltips</h2>
          <div className="flex space-x-4">
            <Tooltip content="This is a tooltip">
              <Button>Hover for Tooltip</Button>
            </Tooltip>
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Tooltip Usage Guidelines</h3>
            <ul className="list-disc pl-5">
              <li>Use for additional context</li>
              <li>Keep tooltip text concise</li>
              <li>Ensure tooltips are accessible</li>
              <li>Avoid overusing tooltips</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

UIPatternGuide.parameters = {
  docs: {
    description: {
      component:
        'Comprehensive guide to UI component patterns, showcasing variations, states, and usage guidelines.',
    },
  },
};

// Interactive Component States
export const ComponentStates: Story = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Component State Variations</h2>
      <div className="flex items-center space-x-4">
        <Button variant="primary" disabled={isDisabled}>
          {isDisabled ? 'Disabled Button' : 'Active Button'}
        </Button>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={() => setIsDisabled(!isDisabled)}
            className="mr-2"
          />
          Toggle Disabled State
        </label>
      </div>
    </div>
  );
};
