/** @type {import("prettier").Config} */
const config = {
  $schema: 'https://json.schemastore.org/prettierrc',
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  plugins: ['prettier-plugin-css-order'],
  overrides: [
    {
      files: '*.cjs',
      options: { parser: 'babel' },
    },
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};

export default config;
