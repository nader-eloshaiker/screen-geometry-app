/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@screengeometry/eslint-config/react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['node_modules/**/*', 'dist/**/*', 'coverage/**/*'],
}
