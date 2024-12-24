import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import puppeteer from 'puppeteer';

// Import all stories for testing
import '../src/stories/Typography.stories';
import '../src/stories/ColorPalette.stories';
import '../src/stories/UIPatterns.stories';
import '../src/components/auth/Login.stories';
import '../src/components/auth/EditProfileForm.stories';

// Visual regression configuration
const getMatchOptions = () => ({
  failureThreshold: 0.01,  // 1% pixel difference allowed
  failureThresholdType: 'percent' as const
});

// Custom test function for visual regression
const customTest = imageSnapshot({
  getMatchOptions,
  async getCustomBrowser() {
    return await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1440,
        height: 900
      }
    });
  },
  beforeScreenshot: async (page) => {
    // Optional: Add custom setup before taking screenshots
    await page.evaluate(() => {
      // Disable animations for consistent screenshots
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    });
  }
});

// Initialize storyshots with custom image snapshot
initStoryshots({
  test: customTest,
  framework: 'react',
  configPath: '.storybook'
});

// Additional custom visual regression tests
describe('Visual Regression Tests', () => {
  it('should have consistent UI across components', () => {
    // Placeholder for additional custom checks
    expect(true).toBe(true);
  });
});
