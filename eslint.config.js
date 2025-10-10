import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      // General JavaScript rules
      'no-console': 'warn',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',

      // Svelte-specific rules (relaxed for development)
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/no-useless-mustaches': 'error',
      'svelte/prefer-class-directive': 'error',
      'svelte/no-at-html-tags': 'warn', // Allow {@html} with warning
      'svelte/require-each-key': 'warn' // Allow missing keys with warning
    }
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: true,
        it: true,
        expect: true,
        vi: true,
        beforeEach: true,
        afterEach: true
      }
    }
  },
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '.svelte-kit/',
      'public/data/'
    ]
  }
];
