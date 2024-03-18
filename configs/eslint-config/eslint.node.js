/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2020: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  globals: {
    window: true,
    module: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['./src/generated/**/*', 'node_modules/', 'dist/'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'prettier/prettier': ['error', { semi: false, endOfLine: 'auto' }],
    'no-empty-function': 'off',
    camelcase: 'error',
    quotes: ['error', 'single'],
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off',
  },
}

/****
import { resolve } from 'node:path'

const project = resolve(process.cwd(), 'tsconfig.json')
****/
