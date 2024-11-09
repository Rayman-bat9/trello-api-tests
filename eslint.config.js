import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es6: true,
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      // Add other ESLint rules here as needed
    },
    ignores: ['node_modules'], // Optional: ignore node_modules folder
  },
]);
