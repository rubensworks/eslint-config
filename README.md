# ESLint Config

[![Build status](https://github.com/rubensworks/eslint-config/workflows/CI/badge.svg)](https://github.com/rubensworks/eslint-config/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/%40rubensworks%2Feslint-config.svg)](https://www.npmjs.com/package/@rubensworks/eslint-config)

This is a repository for my personal [ESLint](https://eslint.org/) configurations.

## Install

```bash
$ yarn add -D @rubensworks/eslint-config eslint
```

or

```bash
$ npm install -D @rubensworks/eslint-config eslint
```

## ESLint config

`eslint.config.js`:
```javascript
const config = require('@rubensworks/eslint-config');

module.exports = config([
  {
    files: [ '**/*.ts' ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [ './tsconfig.eslint.json' ],
      },
    },
  },
  {
    // Override rules like this
    rules: {
      'no-implicit-coercion': 'off'
    },
  }
]);
```

### Test framework rules

Rules for [Jest](https://jestjs.io/) are enabled by default on `**/test/**/*.ts`.
Pass a second argument to toggle them, and to enable the equivalent
[Vitest](https://vitest.dev/) rules instead:

```javascript
const config = require('@rubensworks/eslint-config');

module.exports = config([
  // Your overrides
], { disableJest: true, enableVitest: true });
```

| Option         | Default | Description                                                       |
| -------------- | ------- | ----------------------------------------------------------------- |
| `disableJest`  | `false` | Disable the `eslint-plugin-jest` rules.                           |
| `enableVitest` | `false` | Enable the `@vitest/eslint-plugin` rules, mirroring the Jest ones. |

`@antfu/eslint-config` also registers `eslint-plugin-vitest` under the `test/` prefix for
`**/*.{spec,test,bench,benchmark}.*` and `**/__tests__/**`, so a file such as `test/Foo.test.ts`
matches both that glob and ours. When `enableVitest` is set, the overlapping `test/` rules are
turned off in favour of their `vitest/` equivalents, to avoid the same problem being reported twice.

`.eslintignore`:
```text
node_modules
coverage

**/*.js
**/*.d.ts
**/*.js.map
```

`tsconfig.eslint.json`: _(Needed to force the TS compiler to also consider test files)_
```json
{
  "extends": "./tsconfig.json",
  "include": [
    "index.ts",
    "lib/**/*.ts",
    "test/**/*.ts",
    "bin/**/*.ts"
  ],
  "exclude": [
    "**/node_modules"
  ]
}
```

## Recommended package additions

`.gitignore`:
```
.eslintcache
```

`package.json`:
```json
{
  "scripts": {
    "lint": "eslint . --cache"
  }
}
```

## License

This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
