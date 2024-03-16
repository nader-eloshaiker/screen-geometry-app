/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@screengeometry/eslint-config/node'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
}
