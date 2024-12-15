# Changelog

## 0.4.1

### Patch Changes

- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

## 0.4.0

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

## 0.3.22

### Patch Changes

- 0c3c9b9: Fix T14

## 0.3.21

### Patch Changes

- 00bad92: Update T12

## 0.3.20

### Patch Changes

- b368b355: Escape selector in R34

## 0.3.19

### Patch Changes

- fda645a7: Fix lack of memory when too many applicable elements in T29

## 0.3.18

### Patch Changes

- 12ede1fb: Uupdate T9
- ac1f3f33: Prevent duplicate results in T9

## 0.3.17

### Patch Changes

- 5366561: Fix bug in R67

## 0.3.16

### Patch Changes

- a304824: Add T35

## 0.3.15

### Patch Changes

- cecc88f: # Fixes to unit tests

  These changes tidy up the unit tests, making them less verbose (and headless), and tries to use less code to do the same work.

## 0.3.14

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)

## 0.3.13

### Patch Changes

- 8c1d212: Fixed a bug in T9 where the elements in the result were not properly added

## 0.3.12

### Patch Changes

- 550429b: Monorepo release test

## 0.3.11

### Patch Changes

- 315d70c: Changed prettier command argument

## [0.3.10] - 05/09/2022

### Updated

- QW-WCAG-T9

## [0.3.9] - 04/09/2022

### Updated

- QW-WCAG-T9

## [0.3.8] - 29/05/2022

### Updated

- QW-WCAG-T9
- QW-WCAG-T17
- QW-WCAG-T34

## [0.3.7] - 08/03/2022

### Updated

- QW-WCAG-T26

## [0.3.6] - 12/04/2022

### Updated

- QW-WCAG-T23

## [0.3.5] - 31/03/2022

### Added

- QW-WCAG-T33 and T34

## [0.3.4] - 06/01/2022

### Updated

- QW-WCAG-T16
- dependencies

## [0.3.3] - 10/12/2021

### Updated

- dependencies

## [0.3.2] - 21/10/2021

### Updated

- dependencies

### Fixed

- known bugs

## [0.3.1] - 28/07/2021

### Updated

- dependencies

## [0.3.0-alpha] - 27/07/2021

### Added

- localization support

## [0.2.6] - 23/07/2021

### Fixed

- QW-WCAG-T17

### Updated

- dependencies
- test files

## [0.2.5] - 21/07/2021

### Fixed

- QW-WCAG-T17

## [0.2.4] - 21/06/2021

### Changed

- QW-WCAG-T27 to validate attribute `align` instead of css property `text-align`

### Updated

- dependencies

## [0.2.3] - 30/03/2021

### Updated

- dependencies

## [0.2.2] - 29/03/2021

### Updated

- dependencies
- refactored code to use global qualweb page (qw-page)

## [0.2.1] - 27/03/2021

### Fixed

- issue with webpack config

## [0.2.0] - 27/03/2021

### Updated

- dependencies
- code refactored

## [0.1.17] - 10/03/2021

### Updated

- dependencies
