/**
 * VS Code Default Formatter Configuration
 *
 * To set Prettier as the default formatter:
 * 1. Install the "Prettier - Code formatter" extension
 * 2. Open VS Code settings (Ctrl+,)
 * 3. Search for "Default Formatter"
 * 4. Set "esbenp.prettier-vscode" as the default for JavaScript and TypeScript
 */
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.cjs', '*.cts', '*.mts', '*.mjs'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.config.js', '*.config.cjs', '*.config.mjs'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: ['*.css', '*.scss'],
      options: {
        parser: 'css',
      },
    },
  ],
};
