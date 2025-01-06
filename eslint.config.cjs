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
const tsParser = require('@typescript-eslint/parser');

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
      'public/mockServiceWorker.js',
      'storybook-static/**'
    ]
  },
  {
    // TypeScript and React configuration
    files: ['src/**/*.{ts,tsx,cts}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'spellcheck': spellcheckPlugin
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_', 
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': ['warn', { 
        fixToUnknown: true,
        ignoreRestArgs: true 
      }],
      
      // React hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Code complexity and quality
      'complexity': ['warn', { max: 20 }],
      'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
      
      // Console and debugging
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // Import and module rules
      'no-duplicate-imports': 'warn',
      
      // General code style
      'prefer-const': 'warn'
    }
  }
];
