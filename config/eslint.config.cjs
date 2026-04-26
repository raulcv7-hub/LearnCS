/** 
 * Strict ESLint Configuration.
 * Segmented to prevent React-specific rules from leaking into Astro templates.
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-inline-comments': 'error',
    'line-comment-position': ['error', { position: 'above' }],
    '@typescript-eslint/no-explicit-any': 'error',
    'complexity': ['error', 10],
    'eqeqeq': ['error', 'always'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        /** Astro uses standard 'class' and custom directives, not React's className */
        'react/no-unknown-property': 'off',
        'react/jsx-filename-extension': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
