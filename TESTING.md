# Testing

This document covers some general information regarding the unit and
verification testing being done in the repo.

We use [Mocha](https://mochajs.org) (together with [Chai](https://www.chaijs.com))
for our testing.

Each package has its own .mocharc.js configuration file. While all
configurations derive from a base file .mocharc.base.json in the root of this
repository, some may override base settings or add their own, depending on the
specific needs of that package.

## Unit testing and validation testing

Many tests in the evaluation modules (@qualweb/act-rules, @qualweb/best-practices, @qualweb/wcag-techniques) work more as validation tests rather than unit tests. This is
intentional, as the testing framework works well to manage this kind of test as
well.

## Mocha in VSCode

The extension [Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter)
works well with our tests. If you open the monorepo as a workspace (File -> Open
Workspace from File...), the tests should be detected automatically.

## Mocha from the command line

Running tests from the command is also possible, although using an IDE tool is
much easier.

You can run unit tests for a specific package, either by running `npm -w @qualweb/&lt;package-name&gt; run test` in the root of the monorepo, or simply switching into
the package directory and running `npm run test`.

The `test` scripts are generally just wrappers for a call to `mocha`. You can
call it directly with `npx mocha` if you want to be sure that an NPM script
isn't adding any parameters to the command invocation.

You can choose to run a subset of tests (or a single test) in a number of ways.

A simple approach is to use the `-f`/`--fgrep` flag or `-g`/`-grep` flag.

With `-f`, only the tests with a title that contains a string is run.

Example:

```bash
# Run all tests with the string "QW-BP32"
npx mocha -f QW-BP32
```

Since this may trigger more tests than intended (`-f QW-ACT-R2` will run QW-ACT-R2 and all tests for rules QW-ACT-R20 to QW-ACT-R29), you can use `-g` to pass a more narrow regular expression instead of just a string.

Example:

```bash
# Run all tests that contain the string "QW-BP2" that isn't followed by a digit.
# This is a rough way to only run the tests for QW-BP2. Mocha's grep does not
# support start-of-line or end-of-line markers.
npx mocha -g "QW-BP2[^\d]"
```

It's also possible to override the path spec for test files in `.mocharc.js`
(but please do not commit any changes to the file that were made just to run a
single test!):

```js
const baseOptions = require('../../.mocharc.base.js');

// Override the path spec.
baseOptions.spec = 'test/only_this_test.ts';

module.exports = baseOptions;
```

If you are unsure of a test's title (or generally what their titles are), you
can run `mocha --dry-run` to get a dump of tests without the overhead of
actually running them.