/* eslint-disable no-console, no-undef, @typescript-eslint/no-unused-vars */
module.exports = {
  // Visual regression testing configuration
  testRegex: '.*\\.stories\\.tsx$',
  screenshotsDir: '__snapshots__',

  // Viewport configurations for testing
  viewports: [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ],

  // Threshold for pixel difference
  threshold: {
    // Allowed percentage of pixels that can differ
    percentage: 0.01,

    // Absolute pixel difference
    pixels: 10,
  },

  // Ignore specific CSS properties or elements
  ignore: [
    'content', // Ignore dynamic content
    'transform', // Ignore animations
    'box-shadow', // Ignore subtle shadow differences
  ],
};
