const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    files: ['src/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      prettier
    ],
    rules: {
      // Code Quality Rules
      'complexity': ['warn', 5],
      'max-depth': ['warn', 2],
      'max-lines-per-function': ['warn', 50],
      'no-duplicate-imports': 'error',
      
      // TypeScript Specific Rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    },
    ignores: ['dist/', 'node_modules/']
  }
);
