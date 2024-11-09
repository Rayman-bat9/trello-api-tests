import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 'latest', 
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
    },
    ignores: ['node_modules'],
  },
]);
