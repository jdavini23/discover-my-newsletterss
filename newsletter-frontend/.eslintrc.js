module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable the rule globally
    'max-lines-per-function': ['error', { max: 100 }], // Increase max lines per function
    '@typescript-eslint/no-explicit-any': 'warn', // Change from error to warning
  },
};
