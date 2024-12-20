const eslint = require('eslint');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const path = require('path');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: path.resolve(__dirname, '../tsconfig.json'),
        tsconfigRootDir: path.resolve(__dirname, '..'),
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Unused variables and imports - more lenient for test files
      '@typescript-eslint/no-unused-vars': ['warn', { 
        'vars': 'all', 
        'args': 'after-used',
        'argsIgnorePattern': '^_',
        'ignoreRestSiblings': true,
        'varsIgnorePattern': '^_'
      }],
      'no-duplicate-imports': 'warn',

      // Return types and explicit typing - more lenient
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        'allowExpressions': true,
        'allowTypedFunctionExpressions': true,
        'allowHigherOrderFunctions': true
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Function and complexity limits - increased thresholds
      'max-lines-per-function': ['warn', { 
        max: 120,
        skipBlankLines: true, 
        skipComments: true 
      }],
      'complexity': ['warn', { max: 12 }],
      'max-depth': ['warn', { max: 4 }],

      // Override for test files
      'max-lines-per-function': ['warn', { 
        max: 150,
        skipBlankLines: true, 
        skipComments: true 
      }]
    }
  },
  // Special config for test files
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'max-lines-per-function': ['warn', { 
        max: 200,
        skipBlankLines: true, 
        skipComments: true 
      }],
      'complexity': ['warn', { max: 15 }]
    }
  }
];
