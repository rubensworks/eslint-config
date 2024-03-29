// Copied from https://github.com/antfu/eslint-config/blob/main/src/configs/typescript.ts
// Doing it like this, so we can make sure these only try to trigger on *.ts files,
// Preventing issues with the *.js files.
const typeAwareRules = {
  'dot-notation': 'off',
  'no-implied-eval': 'off',
  'no-throw-literal': 'off',
  'ts/await-thenable': 'error',
  'ts/dot-notation': [ 'error', { allowKeywords: true }],
  'ts/no-floating-promises': 'error',
  'ts/no-for-in-array': 'error',
  'ts/no-implied-eval': 'error',
  'ts/no-misused-promises': 'error',
  'ts/no-throw-literal': 'error',
  'ts/no-unnecessary-type-assertion': 'error',
  'ts/no-unsafe-argument': 'error',
  'ts/no-unsafe-assignment': 'error',
  'ts/no-unsafe-call': 'off',
  'ts/no-unsafe-member-access': 'off',
  'ts/no-unsafe-return': 'error',
  'ts/restrict-plus-operands': 'error',
  'ts/restrict-template-expressions': 'error',
  'ts/unbound-method': [ 'error', { ignoreStatic: true }],
  'ts/switch-exhaustiveness-check': 'error',
};

module.exports = {
  // By default, antfu also triggers type rules on *.js files which causes all kinds of issues for us
  files: [ '**/*.ts' ],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: process.cwd(),
      project: [ './tsconfig.json' ],
    },
  },
  rules: {
    ...typeAwareRules,
    'ts/consistent-type-assertions': [ 'error', {
      assertionStyle: 'angle-bracket',
    }],
    'ts/naming-convention': [
      'error',
      {
        selector: 'default',
        format: [ 'camelCase' ],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'import',
        format: null,
      },
      {
        selector: 'variable',
        format: [ 'camelCase', 'UPPER_CASE' ],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: [ 'PascalCase' ],
      },
      {
        selector: [ 'typeParameter' ],
        format: [ 'PascalCase' ],
        prefix: [ 'T' ],
      },
      {
        selector: 'interface',
        format: [ 'PascalCase' ],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    'ts/explicit-function-return-type': [ 'error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
    }],
    'ts/no-base-to-string': 'error',
    'ts/no-floating-promises': [ 'error', { ignoreVoid: false }],
    'ts/no-unnecessary-boolean-literal-compare': 'error',
    'ts/no-unnecessary-qualifier': 'error',
    'ts/prefer-nullish-coalescing': 'error',
    'ts/prefer-readonly': 'error',
    'ts/prefer-reduce-type-parameter': 'error',
    'ts/prefer-regexp-exec': 'error',
    'ts/prefer-string-starts-ends-with': 'error',
    'ts/require-array-sort-compare': 'error',

    'ts/array-type': [ 'error', { default: 'array' }],
    'ts/generic-type-naming': 'off',
    'ts/no-empty-interface': 'off',
    'ts/space-before-function-paren': [ 'error', 'never' ],
    'ts/member-naming': 'off',
    'ts/no-dynamic-delete': 'off',
    'ts/no-use-before-define': 'off',
    'ts/promise-function-async': 'off',

    // These are not type specific, but we only care about these in TS files
    'max-len': [ 'error', {
      code: 120,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    }],
    'unicorn/filename-case': [ 'error', {
      cases: {
        camelCase: true,
        pascalCase: true,
        kebabCase: false,
        snakeCase: false,
      },
    }],
  },
};
