module.exports = {
  // Configuration for JavaScript files
  extends: ['plugin:prettier/recommended'],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['react', '@typescript-eslint'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'max-params': ['error', 3], // Limit the number of parameters in a function to use object instead
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      },
    },
  ],
};
