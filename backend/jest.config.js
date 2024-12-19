module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  
  // Add environment variables for testing
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true
      }
    }
  },
  
  // Increase timeout for tests that might have connection issues
  testTimeout: 10000,

  // Collect coverage from these directories
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/*.d.ts'
  ],

  // Configure how Jest handles module mocking
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Verbose output for better debugging
  verbose: true
};
