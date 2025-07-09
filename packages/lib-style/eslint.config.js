import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default [
  js.configs.recommended, // Applying the recommended ESLint configuration for JavaScript
  ...tailwindcss.configs['flat/recommended'],
  {
    ignores: ['node_modules/', 'dist/'], // Ignore these directories
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': typescriptEslint,
      tailwindcss,
    },
    rules: {
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
    },
    settings: {
      tailwindcss: {
        config: './tailwind.config.ts',
      },
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off', // Disable requiring React in scope for JSX files
      },
    },
  },
]
