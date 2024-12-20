// @ts-check
const eslint = require('eslint');
const tseslint = require('typescript-eslint');
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const reactJsxRuntime = require('eslint-plugin-react/configs/jsx-runtime');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: ['**/build', '**/dist', '**/node_modules', '**/.vite'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
      reactRecommended,
      reactJsxRuntime,
      prettier
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'import': require('eslint-plugin-import'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y')
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/no-unresolved': 'error'
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...eslint.environments.browser.globals,
        ...eslint.environments.es2021.globals
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
);
