# Changelog

## 0.3.0

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
  - @qualweb/qw-element@0.3.0

## 0.2.23

### Patch Changes

- Updated dependencies [fda645a7]
  - @qualweb/qw-element@0.2.16

## 0.2.22

### Patch Changes

- 9502ca85: Catch ids with new line during accessible name computation

## 0.2.21

### Patch Changes

- Updated dependencies [d87991a0]
  - @qualweb/qw-element@0.2.15

## 0.2.20

### Patch Changes

- Updated dependencies [6b247839]
  - @qualweb/qw-element@0.2.14

## 0.2.19

### Patch Changes

- c345773: Fix R70
- Updated dependencies [c345773]
  - @qualweb/qw-element@0.2.13

## 0.2.18

### Patch Changes

- cecc88f: # Fixes to unit tests

  These changes tidy up the unit tests, making them less verbose (and headless), and tries to use less code to do the same work.

## 0.2.17

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)
- Updated dependencies [295f35f]
  - @qualweb/qw-element@0.2.12

## 0.2.16

### Patch Changes

- Updated dependencies [d512050]
  - @qualweb/qw-element@0.2.11

## 0.2.15

### Patch Changes

- 550429b: Monorepo release test
- Updated dependencies [550429b]
  - @qualweb/qw-element@0.2.10

## 0.2.14

### Patch Changes

- 315d70c: Changed prettier command argument
- ada7fe4: Replaced node-fetch with axios. Fixed processShadowDom
- Updated dependencies [315d70c]
  - @qualweb/qw-element@0.2.9

## [0.2.13] - 01/02/2022

### Updated

- dependencies

## [0.2.12] - 22/07/2021

### Updated

- dependencies

## [0.2.11] - 21/07/2021

### Updated

- dependencies

## [0.2.10] - 19/07/2021

### Updated

- dependencies

## [0.2.9] - 19/07/2021

### Updated

- dependencies

## [0.2.8] - 11/05/2021

### Fixed

- getElement and getElements `iframe` search that caused infinite loops

## [0.2.7] - 15/04/2021

### Changes

- QWPage is now automatic initialized

### Updated

- dependencies

## [0.2.6] - 14/04/2021

### Updated

- dependencies

## [0.2.5] - 31/03/2021

### Fixed

- some issues with webpages that have iframes

## [0.2.4] - 29/03/2021

### Updated

- dependencies
- webpack config

## [0.2.3] - 27/03/2021

### Updated

- dependencies

## [0.2.2] - 25/03/2021

### Updated

- webpack config

## [0.2.1] - 25/03/2021

### Updated

- dependencies
- webpack config
- exported filename
- package.json

## [0.2.0] - 25/03/2021

### Added

- missing types
- typedoc to generate documentation

### Updated

- dependencies

## [0.1.39] - 23/03/2021

### Updated

- dependencies

## [0.1.38] - 23/02/2021

### Updated

- dependencies

## [0.1.37] - 20/02/2021

### Updated

- dependencies
- README.md

## [0.1.36] - 04/02/2021

### Updated

- bug fix

## [0.1.35] - 11/01/2021

### Updated

- dependencies

### Fixed

- known bugs

## [0.1.33] - 06/01/2021

### Fixed

- CSS mapping

## [0.1.33] - 17/12/2020

### Updated

- updated dependencies

## [0.1.32] - 11/12/2020

### Updated

- bug fix

## [0.1.31] - 11/12/2020

### Updated

- dependencies

## [0.1.30] - 05/12/2020

### Fixed

- updated dependencies

## [0.1.29] - 29/10/2020

### Fixed

- updated id selector

## [0.1.28] - 27/10/2020

### Fixed

- updated dependencies

## [0.1.27] - 21/10/2020

### Fixed

- updated dependencies

## [0.1.26] - 07/10/2020

### Fixed

- fixed selector

## [0.1.25] - 07/10/2020

### Fixed

- fixed selector

## [0.1.24] - 24/09/2020

### Fixed

- fixed selector

## [0.1.23] - 23/09/2020

### Fixed

- fixed getHTMLCode

## [0.1.22] - 23/09/2020

### Fixed

- changed selector calculation

## [0.1.21] - 20/08/2020

### Fixed

- updated dependencies

## [0.1.20] - 17/08/2020

### Fixed

- getElement bug

## [0.1.19] - 10/08/2020

### Fixed

- croos origin iframe

## [0.1.17] - 10/08/2020

### Updated

- iframe and shadowDom support

## [0.1.16] - 27/07/2020

### Updated

- dependencies
- css mapping

## [0.1.15] - 10/07/2020

### Updated

- dependencies

## [0.1.15] - 10/07/2020

### Updated

- dependencies

## [0.1.14] - 09/07/2020

### Fixed

- bugs related css mapping

## [0.1.13] - 09/07/2020

### Fixed

- bugs related css mapping

## [0.1.12] - 07/07/2020

### Fixed

- bugs related css mapping

## [0.1.11] - 06/07/2020

### Updated

- qwElement

## [0.1.10] - 06/07/2020

### Updated

- added cache

## [0.1.9] - 06/07/2020

### Updated

- dependencies

### Fixed

- css rules mapping

## [0.1.8] - 06/07/2020

### Added

- css rules mapping to all elements

### Updated

- dependencies

## [0.1.7] - 22/06/2020

### Updated

- webpackPackage

## [0.1.6] - 22/06/2020

### Updated

- dependencies

## [0.1.5] - 29/05/2020

### Updated

- dependencies

## [0.1.4] - 28/05/2020

### Updated

- dependencies

## [0.1.3] - 20/05/2020

### Fixed

- changed types
