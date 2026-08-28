const vitest = require('@vitest/eslint-plugin');

// Unlike `eslint-plugin-jest`, `@vitest/eslint-plugin` sets everything to 'warn' in its `all` config,
// so raise those to 'error' to match the jest config. Rules that `all` explicitly disables stay off.
const allRules = Object.fromEntries(Object.entries(vitest.configs.all.rules)
  .map(([ rule, severity ]) => [ rule, severity === 'off' ? 'off' : 'error' ]));

// Specifically for tests
module.exports = {
  plugins: {
    vitest,
  },
  files: [ '**/test/**/*.ts' ],
  rules: {
    ...allRules,
    // '@antfu/eslint-config' enforces 'it' via 'test/consistent-test-it', but this plugin's default
    // is 'test' at the top level, so carry the option over to keep enforcing 'it' everywhere.
    'vitest/consistent-test-it': [ 'error', { fn: 'it', withinDescribe: 'it' }],

    // Rule is not smart enough to check called function in the test
    'vitest/expect-expect': 'off',

    // Default rules that are overkill
    'vitest/no-hooks': 'off',
    'vitest/max-expects': 'off',
    'vitest/no-conditional-in-test': 'off',
    'vitest/prefer-expect-assertions': 'off',
    'vitest/prefer-lowercase-title': 'off',
    'vitest/prefer-strict-equal': 'off',
    'vitest/require-hook': 'off',
    'vitest/valid-title': 'off',
    'vitest/unbound-method': 'off',

    // Vitest-only rules (no jest counterpart) that are overkill
    // Forces `describe(MyClass, ...)` over the conventional `describe('MyClass', ...)`
    'vitest/prefer-describe-function-title': 'off',
    // Forces explicit type parameters on every `vi.fn()`
    'vitest/require-mock-type-parameters': 'off',
    // Test files are already exempt from 'unicorn/filename-case' below
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

    'max-statements-per-line': 'off',
    'id-length': 'off',
    'arrow-body-style': 'off',
    'line-comment-position': 'off',
    'no-inline-comments': 'off',
    'unicorn/filename-case': 'off',
    'no-new': 'off',
    'unicorn/no-nested-ternary': 'off',
    'no-return-assign': 'off',
    'no-useless-call': 'off',
    'no-sync': 'off',
    'import/no-extraneous-dependencies': 'off',
    'func-style': 'off',
    'unicorn/consistent-function-scoping': 'off',

    // '@antfu/eslint-config' registers the older 'eslint-plugin-vitest' under the 'test/' prefix and
    // enables these on '**/*.{spec,test,bench,benchmark}.*' and '**/__tests__/**'. Files such as
    // 'test/Foo.test.ts' match that glob and ours, so both plugins would report the same problem
    // twice. The 'vitest/' rules above supersede them, so turn the duplicates off.
    'test/consistent-test-it': 'off',
    'test/no-identical-title': 'off',
    'test/no-import-node-test': 'off',
    // Superseded by 'vitest/no-focused-tests'
    'test/no-only-tests': 'off',
    'test/prefer-hooks-in-order': 'off',
    'test/prefer-lowercase-title': 'off',

    'ts/naming-convention': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-return': 'off',
    'ts/unbound-method': 'off',
    'ts/brace-style': 'off',
    'ts/ban-ts-comment': 'off',
    'ts/ban-ts-ignore': 'off',
    'ts/explicit-function-return-type': 'off',
    'ts/no-extra-parens': 'off',
    'ts/restrict-plus-operands': 'off',
    'ts/no-require-imports': 'off',
    'ts/no-var-requires': 'off',

    // Incorrectly detects usage of undefined in "toHaveBeenLastCalledWith" checks
    'unicorn/no-useless-undefined': 'off',
  },
};
