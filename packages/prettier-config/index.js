/** @type {import('prettier').Config} **/
module.exports = {
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  jsxSingleQuote: true,
  bracketSpacing: true,
  plugins: ['prettier-plugin-organize-imports'],
}
