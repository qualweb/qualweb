# Changelog

## 0.2.1

### Patch Changes

- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

## 0.2.0

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

## 0.1.19

### Patch Changes

- a605c89: Updated Norwegian language files.

## 0.1.18

### Patch Changes

- 47d679d3: Create QW-ACT-R77

## 0.1.17

### Patch Changes

- a304824: Add T35
- 52360b5: Add BP29

## 0.1.16

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)

## 0.1.15

### Patch Changes

- 8c1d212: Fixed a bug in T9 where the elements in the result were not properly added

## 0.1.14

### Patch Changes

- 550429b: Monorepo release test

## 0.1.13

### Patch Changes

- 315d70c: Changed prettier command argument

### [0.1.12] - 07/09/2023

### Updated

- Added new bp

### [0.1.11] - 31/03/2022

### Updated

- Added new bps and techniques

### [0.1.10] - 06/12/2021

### Updated

- Finnish and Swedish locale

### [0.1.9] - 03/12/2021

### Updated

- @qualweb/types to support Swedish locale

### [0.1.8] - 03/12/2021

### Added

- Swedish locale

### [0.1.7] - 01/10/2021

### Added

- new failed error code and description to QW-ACT-R4 and QW-ACT-R71

### Fixed

- some old RC to new codes

### [0.1.6] - 29/09/2021

### Added

- Finnish locale

### Updated

- English locale

### [0.1.5] - 28/07/2021

### Updated

- dependencies
- README.md

### [0.1.4] - 28/07/2021

### Updated

- dependencies

### [0.1.3-alpha] - 27/07/2021

### Updated

- translations
- dependencies

### [0.1.2-alpha] - 11/05/2021

### Added

- english translations for @qualweb/best-practices module

### Updated

- dependencies

### [0.1.1-alpha] - 04/05/2021

### Fixed

- general bugs

### [0.1.0-alpha] - 04/05/2021

### Added

- locales "en" and "pt" for testing
- translate function
