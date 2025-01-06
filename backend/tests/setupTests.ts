// Setup file for Jest tests
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ 
  path: path.resolve(__dirname, '../.env.test') 
});

// Use module.exports to define global setup
module.exports = {
  // Optional: Global test setup
  setup: () => {
    // Any global setup can go here
    // For example, initializing test databases, mocking services, etc.
  },

  // Global error handling for unhandled promises
  teardown: () => {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Optionally, you can choose to crash the process
      // process.exit(1);
    });
  }
};
