// eslint.config.cjs
//
// Formatter Configuration Notes:
// To resolve "Multiple formatters" warning in VS Code:
// 1. Install the "Prettier - Code formatter" extension
// 2. Open VS Code settings (Ctrl+,)
// 3. Search for "Default Formatter"
// 4. Set "esbenp.prettier-vscode" as the default for JavaScript and TypeScript
//
// Alternatively, add to VS Code settings.json:
// {
//   "editor.defaultFormatter": "esbenp.prettier-vscode",
//   "[typescript]": {
//     "editor.defaultFormatter": "esbenp.prettier-vscode"
//   },
//   "[javascript]": {
//     "editor.defaultFormatter": "esbenp.prettier-vscode"
//   }
// }

const eslint = require('eslint');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const spellcheckPlugin = require('eslint-plugin-spellcheck');
const globals = require('globals');

module.exports = [
  {
    // Global ignore patterns
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      '**/*.config.*',
      '.eslintrc.cjs',
      '.prettierrc.js',
      'public/mockServiceWorker.js'
    ]
  },
  {
    // TypeScript and React configuration
    files: ['src/**/*.{ts,tsx,cts}'],
    languageOptions: {
      parser: typescriptEslint.parser,
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      react: reactPlugin,
      spellcheck: spellcheckPlugin
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      
      // Semicolon rules
      'semi': ['error', 'always'],
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false }
      }],

      // React hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',

      // Code complexity and quality
      'complexity': ['error', { max: 15 }],
      'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
      'no-duplicate-imports': 'error',

      // Stylistic rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error'
    },
    settings: {
      react: { version: 'detect' }
    }
  }
];
