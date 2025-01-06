import { axe, toHaveNoViolations } from 'jest-axe';
import { expect } from '@storybook/jest';

// Extend Jest expect with axe matchers
expect.extend(toHaveNoViolations);

export async function runAccessibilityTest(renderFn: () => JSX.Element) {
  const { container } = render(renderFn());
  const results = await axe(container);

  expect(results).toHaveNoViolations();
}

export function createA11yTest(renderFn: () => JSX.Element) {
  return {
    play: async () => {
      await runAccessibilityTest(renderFn);
    },
  };
}

// Color contrast utility
export function checkColorContrast(foregroundColor: string, backgroundColor: string) {
  // Implement color contrast calculation
  // This is a simplified version and should be replaced with a more robust implementation
  const calculateLuminance = (color: string) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getLuminanceContrast = (color1: string, color2: string) => {
    const lum1 = calculateLuminance(color1);
    const lum2 = calculateLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const contrastRatio = getLuminanceContrast(foregroundColor, backgroundColor);

  // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
  return contrastRatio >= 4.5;
}

// Focus management utility
export function testFocusManagement(component: JSX.Element) {
  const { container } = render(component);

  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  // Check that focus can move through all elements
  focusableElements.forEach((element, index) => {
    element.dispatchEvent(new Event('focus'));

    // Check if the element receives focus
    expect(document.activeElement).toBe(element);

    // Optional: Check tab order if needed
    if (index < focusableElements.length - 1) {
      const nextElement = focusableElements[index + 1];
      nextElement.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
        })
      );
    }
  });
}
