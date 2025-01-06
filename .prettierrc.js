/* eslint-disable no-console, no-undef, @typescript-eslint/no-unused-vars */
/**
 * VS Code Default Formatter Configuration
 *
 * To set Prettier as the default formatter:
 * 1. Install the 'Prettier - Code formatter' extension
 * 2. Open VS Code settings (Ctrl+,)
 * 3. Search for 'Default Formatter'
 * 4. Set 'esbenp.prettier-vscode' as the default for JavaScript and TypeScript
 */
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
};
