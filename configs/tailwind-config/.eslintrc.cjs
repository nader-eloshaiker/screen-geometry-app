/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@screengeometry/eslint-config/node'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['node_modules/**/*', 'dist/**/*', 'coverage/**/*'],
}
