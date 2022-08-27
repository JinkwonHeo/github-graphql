module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: 'warn',
    'eol-last': 'warn',
    'no-undef': 'warn',
    'no-console': 'warn',
    'no-multi-spaces': 'warn',
    'no-trailing-spaces': 'warn',
    quotes: ['warn', 'single'],
    'comma-style': ['warn', 'last'],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'comma-dangle': ['warn', 'always-multiline'],
  },
};
