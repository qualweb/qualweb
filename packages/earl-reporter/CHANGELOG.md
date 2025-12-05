# Changelog

## 0.5.5

### Patch Changes

- Updated dependencies [850181b]
  - @qualweb/core@0.8.5

## 0.5.4

### Patch Changes

- @qualweb/core@0.8.4

## 0.5.3

### Patch Changes

- @qualweb/core@0.8.3

## 0.5.2

### Patch Changes

- 40efb72: Updated repository, bugs, and homepage fields for all package.json files
- Updated dependencies [63a0b5d]
- Updated dependencies [40efb72]
  - @qualweb/core@0.8.2

## 0.5.1

### Patch Changes

- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

- Updated dependencies [38078bb]
- Updated dependencies [38078bb]
  - @qualweb/core@0.8.1

## 0.5.0

### Minor Changes

- f7c46a2: # Major refactor and code cleanup

  This update makes significant changes to the overall structure of QualWeb's
  code and the API. Most users should be able to be able to migrate with only a
  few changes.

  There's a new convention for running evaluations. See the next section for a
  brief migration guide.

  Additionally, several packages are no longer in use. If you are using any of
  the following packages in your project, remove them when you update to the new
  version of `@qualweb/core` to avoid any issues:

  - `@qualweb/types`
  - `@qualweb/dom`
  - `@qualweb/evaluation`

  ## New convention for calling QualWeb

  Previous versions of QualWeb expects an options object containing detailed
  configurations for each supported module. While this reduced bootstrapping a bit
  (users only needed to install `@qualweb/core` to get started), it was a bit
  rigid and bothersome to maintain/extend.

  Now, individual evaluation modules must be instantiated and configured by the
  user and passed to QualWeb.

  For most users, updating your code should be quite simple. Here's an example.

  Currently, you might have an evaluation run like this:

  ```typescript
  import { Qualweb } from '@qualweb/core';

  const qw = new QualWeb();
  await qw.start();

  const result = await qw.evaluate({
    url: 'https://example.com',
    execute: {
      act: true
    },
    'act-rules': {
      levels: ['A', 'AA']
    }
  });
  ```

  To update to work with the new API, do the following:

  First, install the modules you use as additional dependencies in your project.
  For this example, adding `@qualweb/act-rules` next to `@qualweb/core` in your
  package.json file. The other modules you might be using are:

  - `@qualweb/wcag-techniques`
  - `@qualweb/counter`
  - `@qualweb/best-practices`

  Then, for each module you are using, import that package and create an instance
  of that module for use in QualWeb. Pass that instance to the evaluate function
  instead. Updated, the previous example would now look like this:

  ```typescript
  import { Qualweb } from '@qualweb/core';
  // Import the evaluation module.
  import { ACTRules } from '@qualweb/act-rules';

  const qw = new Qualweb();
  await qw.start();

  // Instantiate an evaluation module and configure it before
  // passing it to QualWeb.
  const actRulesModule = new ACTRules({
    levels: ['A']
  });

  const result = await qw.evaluate({
    url: 'https://example.com',
    // Add the module to be run here.
    modules: [actRulesModule]
  });
  ```

  The approach is similar to how middleware/plugins works in express-style
  frameworks.

  ## Removal of @qualweb/types

  The typings package `@qualweb/types` has been removed. Historically, it contained
  the TypeScript types applicable to all other packages. Now, those types are
  exported from the source packages instead. For example, where you would
  previously install both `@qualweb/core` and `@qualweb/types` to have proper
  typing for the `Qualweb` object, it is now sufficient just to install
  `@qualweb/core`.

  Make sure to remove @qualweb/types from your project if you were using it, to
  avoid any issues with conflicting types.

  ## Removal of @qualweb/evaluation and @qualweb/dom

  These packages have been rolled into either core or util. For anyone using
  QualWeb solely through the `@qualweb/core` package, this should not cause any
  issues.

  ## Anything missing?

  This is a fairly set of changes, and we may have missed something moving things
  around. While QualWeb _should_ run without any notable changes, please do add
  an issue if you have any problems.

### Patch Changes

- Updated dependencies [f7c46a2]
  - @qualweb/core@0.8.0

## 0.4.6

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)

## 0.4.5

### Patch Changes

- 550429b: Monorepo release test

## 0.4.4

### Patch Changes

- 315d70c: Changed prettier command argument

## [0.4.3] - 19/05/2021

### Updated

- Fixed typo

## [0.4.2] - 12/05/2021

### Added

- isPartOf https://act-rules.github.io/pages/implementations/earl-reports/

## [0.4.1] - 23/03/2021

### Added

- code documentation

### Updated

- dependencies

## [0.4.0] - 22/03/2021

### Changes

- code refactored
- functions no longer return a promise since it wasn't needed

## [0.3.0] - 16/07/2020

### Updated

- compatibility with wcag-techniques module

## [0.2.7] - 27/07/2020

### Updated

- dependencies
- tests

## [0.2.6] - 09/07/2020

### Updated

- License

## [0.2.5] - 06/05/2020

### Updated

- reporters to meet the new report changes

## [0.2.4] - 03/04/2020

### Updated

- report context

## [0.2.3] - 21/01/2020

### Updated

- report context

## [0.2.2] - 21/01/2020

### Updated

- report context

## [0.2.1] - 17/01/2020

### Added

- redirectedTo parameter to the Assertion interface

### Changed

- context to @context
- graph to @graph

## [0.2.0] - 15/01/2020

### Changed

- function generateEARLReport

## [0.1.0] - 17/10/2019

### Added

- cantTell result to act-rules reporter

## [0.0.6] - 07/10/2019

### Added

- options to report only selected modules

### Changed

- architecture

## [0.0.5] - 27/09/2019

### Fixed

- bug where a 'warning' result wasn't changed to 'cantTell' in all parsers

## [0.0.4] - 17/09/2019

### Added

- best-practices module parser

### Changed

- "how to run" section on the README.md file

## [0.0.3] - 12/08/2019

### Added

- "mocha" framework
- basic test file (test/report.spec.js)

### Updated

- @qualweb/types
