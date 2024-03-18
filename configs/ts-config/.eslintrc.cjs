/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@screengeometry/eslint-config/node'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['react.json', 'node.json'],
  },
  ignorePatterns: ['node_modules/**/*', 'dist/**/*', 'coverage/**/*'],
}
