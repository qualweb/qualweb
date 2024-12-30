# Changelog

## 0.4.2

### Patch Changes

- 40efb72: Updated repository, bugs, and homepage fields for all package.json files

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

## 0.3.20

### Patch Changes

- 2b34d754: Update crawl filter

## 0.3.19

### Patch Changes

- b5b79f1f: Add zip to not crawl list

## 0.3.18

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)

## 0.3.17

### Patch Changes

- 550429b: Monorepo release test

## 0.3.16

### Patch Changes

- 315d70c: Changed prettier command argument

## [0.3.15] - 11/01/2022

### Updated

- bug fixes

## [0.3.14] - 21/09/2022

### Updated

- added url verification

## [0.3.13] - 26/05/2022

### Fixed

- '/' bug

## [0.3.12] - 28/10/2021

### Fixed

- known bugs

## [0.3.11] - 21/10/2021

### Removed

- unnecessary console.log() in the code

### Updated

- dependencies

## [0.3.10] - 21/10/2021

### Added

- waitUntil option to Crawler constructor. Wait for dom events before preforming the page search. This will make possible to crawl dynamic pages, but the process will be slower.

### Updated

- dependencies

### Fixed

- known bugs

## [0.3.9] - 21/07/2021

### Updated

- tsconfig.json file

## [0.3.8] - 21/07/2021

### Removed

- @types/puppeteer from dev-dependencies

## [0.3.7] - 19/07/2021

### Fixed

- incorrect urls when href value was not trimmed
- verification for href with "mailto:", "tel:" and "javascript:"

### Updated

- dependencies

## [0.3.6] - 12/05/2021

### Updated

- dependencies

## [0.3.5] - 05/05/2021

### Removed

- php extension from being excluded during the crawling process

### Updated

- dependencies

## [0.3.4] - 23/04/2021

### Added

- option for BrowserContext in the constructor

### Updated

- dependencies

## [0.3.3] - 13/04/2021

### Added

- viewport options to Crawler class. These options are used when fetching the webpage

### Updated

- dependencies

## [0.3.2] - 9/04/2021

### Added

- timeout option
- more logging

### Fixed

- some bugs

## [0.3.1] - 02/04/2021

### Fixed

- some bugs

## [0.3.0] - 01/04/2021

### Changes

- This module now uses puppeteer instead of simplecrawler to crawl websites

### Updated

- dependencies
- code refactored

## [0.2.2] - 24/04/2020

### Fixed

- some bugs

## [0.2.1] - 24/04/2020

### Fixed

- some bugs

## [0.2.0] - 24/04/2020

### Added

- feedback messages
- possibility to interrupt the crawling process

## [0.1.1] - 19/12/2019

### Updated

- code optimization

## [0.1.0] - 18/12/2019

### Fixed

- some bugs

## [0.0.1] - 27/09/2019

### Added

- crawling mechanism
