import eslint from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import configPrettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  globalIgnores(['dist/**/*'], 'Ignore Build Directory'),
  eslint.configs.recommended,
  pluginQuery.configs['flat/recommended'],
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  tseslint.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'coverage/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.vitest,
        ...globals.node,
        module: true,
        window: true,
      },
    },
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      importPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all', // Check all variables for usage
          varsIgnorePattern: '^_',
        },
      ],
      camelcase: 'error',
      'no-duplicate-imports': 'error',

      'no-empty-function': 'off',

      'no-unused-vars': 'off',

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: false,
        },
      ],
      quotes: ['error', 'single'],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'sort-keys-custom-order/import-object-keys': 'off', // handled by prettier

      // 'tailwindcss/classnames-order': 'warn',

      // 'tailwindcss/no-custom-classname': [
      //   'warn',
      //   {
      //     callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'cn', 'twMerge', 'tw'],
      //   },
      // ],

      // 'tailwindcss/no-contradicting-classname': 'error',
    },
  },
  configPrettier, // Must go second last
  prettierPlugin // Must go last
)
