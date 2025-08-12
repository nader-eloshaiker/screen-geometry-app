// import { FlatCompat } from '@eslint/eslintrc'
import jsEslint from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals/index.js'
import tsEslint from 'typescript-eslint'

import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig([
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'coverage/'],
  },
  {
    files: ['**/*.{js,mjs,ts,tsx,jsx}'],

    plugins: {
      react,
      '@typescript-eslint': tsEslint.plugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
        ...globals.node,
        window: true,
        module: true,
      },

      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        createClass: 'createReactClass',
        pragma: 'React',
        fragment: 'Fragment',
        version: 'detect',
        flowVersion: '0.53',
      },
    },

    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all', // Check all variables for usage
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      'prettier/prettier': [
        'error',
        {
          semi: false,
          endOfLine: 'auto',
        },
      ],

      'no-empty-function': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      camelcase: 'error',
      quotes: ['error', 'single'],
      'no-duplicate-imports': 'error',

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },
  eslintConfigPrettier, // Must go last
])
