const antfu = require('@antfu/eslint-config');
const generalConfig = require('./eslint/general');
const testConfig = require('./eslint/test');
const testVitestConfig = require('./eslint/test-vitest');
const typedConfig = require('./eslint/typed');
const unicornConfig = require('./eslint/unicorn');

module.exports = async(options, { disableJest, enableVitest } = {}) => [
  await antfu.default(),
  generalConfig,
  unicornConfig,
  typedConfig,
  ...(disableJest ? [] : [ testConfig ]),
  ...(enableVitest ? [ testVitestConfig ] : []),
  {
    files: [ '**/bin/*.ts' ],
    rules: {
      'unicorn/filename-case': [ 'error', {
        case: 'kebabCase',
      }],
      'no-process-env': 'off',
      'unicorn/no-process-exit': 'off',
    },
  },
  {
    files: [ '**/*.md/**', '**/*.md' ],
    rules: {
      'unicorn/filename-case': 'off',
      'import/no-extraneous-dependencies': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  ...Array.isArray(options) ? options : [ options ],
].flat();
