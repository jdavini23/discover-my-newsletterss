module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable the rule globally
    '@typescript-eslint/no-explicit-any': 'warn', // Change from error to warning
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    
    // React hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // General code quality rules
    'complexity': ['error', { max: 15 }], // Increased from 10
    'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }], // Increased from 50
    'no-duplicate-imports': 'error',
    
    // Stylistic rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
