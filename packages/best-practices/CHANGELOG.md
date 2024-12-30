# Changelog

## 0.7.3

### Patch Changes

- 40efb72: Updated repository, bugs, and homepage fields for all package.json files

## 0.7.2

### Patch Changes

- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

## 0.7.1

### Patch Changes

- cef0718: Fix way BP28 updates results

## 0.7.0

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

## 0.6.19

### Patch Changes

- f336aacb: Add passed test for BP25

## 0.6.18

### Patch Changes

- 9d4df478: Landmark BPs only return when applicable

## 0.6.17

### Patch Changes

- eb596a97: Fix reference getter when javascript is used inside href

## 0.6.16

### Patch Changes

- 5366561: Fix bug in R67

## 0.6.15

### Patch Changes

- 52360b5: Add BP29

## 0.6.14

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)

## 0.6.13

### Patch Changes

- 550429b: Monorepo release test

## 0.6.12

### Patch Changes

- 315d70c: Changed prettier command argument

## [0.6.11] - 26/09/2023

### Added

- Fixed Bp 19

## [0.6.10] - 19/09/2023

### Added

- Fixed Bp 19

## [0.6.9] - 19/06/2023

### Added

-QW-B28

## [0.6.8] - 30/05/2023

### Updated

- Fixed BP23

## [0.6.7] - 31/03/2021

### Updated

- Added BP19-27

## [0.6.6] - 24/12/2021

### Updated

- QW-BP8

## [0.6.5] - 10/12/2021

### Fixed

- issues related to QW-BP18

### Updated

- dependencies

## [0.6.4] - 21/10/2021

### Updated

- dependencies

### Fixed

- known bugs

## [0.6.3] - 12/10/2021

### Fixed

- QW-BP15: width attribute without unit was passing instead of failing

### Updated

- dependencies

## [0.6.2] - 28/07/2021

### Updated

- dependencies

## [0.6.1-alpha] - 27/07/2021

### Added

- localization support

## [0.5.3] - 26/04/2021

### Fixed

- QW-BP7 ASCII art detection in title elements

### Updated

- dependencies

## [0.5.2] - 29/03/2021

### Updated

- dependencies
- refactor code to use global qualweb page (qw-page)

## [0.5.1] - 27/03/2021

### Fixed

- issue with webpack config

### Updated

- dependencies

## [0.5.0] - 26/03/2021

### Updated

- dependencies
- code refactored

## [0.4.17] - 10/03/2021

### Updated

- dependencies

## [0.4.17] - 08/03/2021

### Updated

- dependencies

## [0.4.16] - 26/02/2021

### Added

- "exclude" option to exclude best practices from running

### Updated

- dependencies

## [0.4.13] - 08/01/2021

### Updated

- dependencies
- webpack config

## [0.4.12] - 10/11/2020

### Updated

- dependencies

## [0.4.11] - 12/10/2020

### Fixed

- some bugs

## [0.4.10] - 12/10/2020

### Fixed

- some bugs

### Updated

- dependencies

### Removed

- QW-BP16

## [0.4.9] - 29/09/2020

### Added

- QW-BP17
- QW-BP18

## [0.4.8] - 29/07/2020

### Fixed

- known bugs

## [0.4.7] - 28/07/2020

### Fixed

- known bugs

## [0.4.6] - 27/07/2020

### Updated

- dependencies

## [0.4.5] - 27/07/2020

### Updated

- dependencies

## [0.4.4] - 02/07/2020

### Updated

- dependencies

## [0.4.3] - 02/07/2020

### Fixed

- some bugs

## [0.3.5] - 13/05/2020

### Fixed

- maxParallelEvaluations bug

## [0.3.4] - 11/05/2020

### Fixed

- maxParallelEvaluations bug

## [0.3.3] - 06/05/2020

### Updated

- dependencies
- report interface
- tests

## [0.3.2] - 14/04/2020

### Added

- QW-BP16

### Updated

- dependencies

## [0.3.1] - 17/01/2020

### Updated

- dependencies

## [0.3.0] - 16/01/2020

### Updated

- module architecture

## [0.2.4] - 16/12/2019

### Fixed

- QW-BP14 and QW-BP15 bugs

## [0.2.3] - 16/12/2019

### Updated

- README.md

### Fixed

- some best practices with errors and some tests

## [0.2.2] - 11/12/2019

### Fixed

- a bug in QW-BP14

## [0.2.1] - 11/12/2019

### Added

- QW-BP14 and QW-BP15

### Fixed

- some best practices bugs

## [0.2.0] - 02/12/2019

### Updated

- best practices to work with new core architecture

## [0.1.2] - 20/11/2019

### Fixed

- QW-BP10 and QW-BP11 mapping

## [0.1.1] - 18/11/2019

### Added

- Fixed dependencies

## [0.1.0] - 12/11/2019

### Added

- QW-BP2 to QW-BP13

## [0.0.1] - 04/10/2019

### Added

- basic structure for the module to work
- QW-BP1
