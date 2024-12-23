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
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '.eslintrc.cjs',
      '.prettierrc.js',
      'commitlint.config.js',
      'postcss.config.js',
      'tailwind.config.js',
      'vite.config.cts',
      'vitest.config.cts',
      'public/mockServiceWorker.js',
      '.lighthouserc.js'
    ]
  },
  {
    files: ['src/**/*.{ts,tsx,cts}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
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
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Temporarily disabled
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'spellcheck/spell-checker': [
        'warn',
        {
          comments: true,
          strings: true,
          identifiers: true,
          skipWords: [
            'newsletter', 'newsletters', 'auth', 'signup', 'login', 'vercel',
            'tailwind', 'typescript', 'javascript', 'jsx', 'tsx', 'vite',
            'firestore', 'firebase', 'uid', 'bg', 'py', 'mb', 'mx', 'xl', 'semibold',
            'noopener', 'noreferrer', 'evenodd', 'pathname', 'whitespace', 'nowrap',
            'rgb', 'pb', 'mr', 'sr', 'ip', 'extrabold', 'checkbox', 
            // Storybook and UI related
            'autodocs', 'radix', 'tooltip', 'cybersecurity', 
            'blockchain', 'neuroscience', 'chakra', 'zustand',
            // Technical terms and abbreviations
            'dom'
          ]
        }
      ]
    }
  }
];
