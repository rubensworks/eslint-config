const vitest = require('@vitest/eslint-plugin');
const jestConfig = require('./test');

// Unlike `eslint-plugin-jest`, `@vitest/eslint-plugin` sets everything to 'warn' in its `all` config,
// so raise those to 'error' to match the jest config. Rules that `all` explicitly disables stay off.
const allVitestRules = Object.fromEntries(Object.entries(vitest.configs.all.rules)
  .map(([ rule, severity ]) => [ rule, severity === 'off' ? 'off' : 'error' ]));

// Reuse the overrides of the jest config, with its disabled 'jest/' rules mapped to their 'vitest/' counterparts.
const jestOverrideRules = Object.fromEntries(Object.entries(jestConfig.rules)
  .filter(([ rule, severity ]) => !rule.startsWith('jest/') || severity === 'off')
  .map(([ rule, severity ]) => [ rule.replace(/^jest\//u, 'vitest/'), severity ]));

// Specifically for tests
module.exports = {
  plugins: {
    vitest,
  },
  files: jestConfig.files,
  rules: {
    ...allVitestRules,
    ...jestOverrideRules,

    // Vitest-only rules that are overkill
    // Rewrites `toBeTruthy()` into `toBe(true)`, which asserts something stricter than was written
    'vitest/prefer-strict-boolean-matchers': 'off',
    // Forces `describe(MyClass, ...)` over the conventional `describe('MyClass', ...)`
    'vitest/prefer-describe-function-title': 'off',
    // Forces explicit type parameters on every `vi.fn()`
    'vitest/require-mock-type-parameters': 'off',
    // Test files are already exempt from 'unicorn/filename-case'
    'vitest/consistent-test-filename': 'off',
    // Purely stylistic, and 'padding-around-all' duplicates the more specific ones
    'vitest/padding-around-after-all-blocks': 'off',
    'vitest/padding-around-after-each-blocks': 'off',
    'vitest/padding-around-all': 'off',
    'vitest/padding-around-before-all-blocks': 'off',
    'vitest/padding-around-before-each-blocks': 'off',
    'vitest/padding-around-describe-blocks': 'off',
    'vitest/padding-around-expect-groups': 'off',
    'vitest/padding-around-test-blocks': 'off',

    // '@antfu/eslint-config' enables these on '**/*.test.*' files, duplicating the 'vitest/' rules above
    'test/consistent-test-it': 'off',
    'test/no-identical-title': 'off',
    'test/no-import-node-test': 'off',
    'test/no-only-tests': 'off',
    'test/prefer-hooks-in-order': 'off',
  },
};
