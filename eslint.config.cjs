/* eslint-disable no-console, no-undef, @typescript-eslint/no-unused-vars */
// eslint.config.cjs
//
// Formatter Configuration Notes:
// To resolve 'Multiple formatters' warning in VS Code:
// 1. Install the 'Prettier - Code formatter' extension
// 2. Open VS Code settings (Ctrl+,)
// 3. Search for 'Default Formatter'
// 4. Set 'esbenp.prettier-vscode' as the default for JavaScript and TypeScript
//
// Alternatively, add to VS Code settings.json:
// {
//   'editor.defaultFormatter': 'esbenp.prettier-vscode',
//   '[typescript]': {
//     'editor.defaultFormatter': 'esbenp.prettier-vscode'
//   },
//   '[javascript]': {
//     'editor.defaultFormatter': 'esbenp.prettier-vscode'
//   }
// }

const eslint = require('eslint');
const tseslint = require('typescript-eslint');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const prettier = require('eslint-plugin-prettier');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },
  {
    files: [
      '.lighthouserc.js',
      '.prettierrc.js',
      'build-script.js',
      'commitlint.config.js',
      'eslint.config.cjs',
      'jest.setup.js',
      'ladle.config.cjs',
      'postcss.config.cjs',
      'visual-regression.config.js',
      'vite.config.js',
    ],
    rules: {
      'no-undef': 'off',
      module: 'off',
      require: 'off',
      process: 'off',
      __dirname: 'off',
      console: 'off',
    },
  },
];
