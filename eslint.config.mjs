import { defineConfig } from '@shahrad/eslint-config';
import globals from 'globals';

export default defineConfig(
  {
    ignores: ['dist/**', 'bench/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-console': 'error',
    },
  }
);
