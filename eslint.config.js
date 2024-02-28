const config = require('.');

module.exports = config({
  files: [ '**/*.ts' ],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: [ './tsconfig.eslint.json' ],
    },
  },
});
