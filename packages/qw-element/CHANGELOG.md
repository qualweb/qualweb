# Changelog

## 0.3.2

### Patch Changes

- 40efb72: Updated repository, bugs, and homepage fields for all package.json files

## 0.3.1

### Patch Changes

- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

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

## 0.2.16

### Patch Changes

- fda645a7: Fix lack of memory when too many applicable elements in T29

## 0.2.15

### Patch Changes

- d87991a0: Fix shadow dom processing for getting text nodes

## 0.2.14

### Patch Changes

- 6b247839: ShadowDom support in getElementParent

## 0.2.13

### Patch Changes

- c345773: Fix R70

## 0.2.12

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)

## 0.2.11

### Patch Changes

- d512050: Improve shadow dom support

## 0.2.10

### Patch Changes

- 550429b: Monorepo release test

## 0.2.9

### Patch Changes

- 315d70c: Changed prettier command argument

## [0.2.8] - 01/02/2022

### Added

- dispach event

## [0.2.7] - 22/07/2021

### Added

- getElementOwnText function

## [0.2.6] - 21/07/2021

### Fixed

- getElementText function

## [0.2.5] - 19/07/2021

### Added

- getAllNextSiblings function
- getAllPreviousSiblings function

## [0.2.4] - 19/07/2021

### Added

- getNextSibling function
- getPreviousSibling function

### Updated

- dependencies

## [0.2.3] - 14/04/2021

### Updated

- dependencies
- code optimized

## [0.2.2] - 25/03/2021

### Changes

- general bugs fixed

## [0.2.1] - 25/03/2021

### Added

- typedoc to generate documentation

### Updated

- dependencies

## [0.2.0] - 25/03/2021

### Added

- missing types

### Updated

- dependencies

## [0.1.33] - 09/03/2021

### Testing

- getElementText() with shadow root

## [0.1.32] - 23/02/2021

### Added

- click function to interface

### Updated

- dependencies

## [0.1.31] - 20/02/2021

### Updated

- dependencies

## [0.1.30] - 19/02/2021

### Updated

- dependencies
- README.md

## [0.1.29] - 08/01/2021

### Updated

- dependencies
- tsconfig

## [0.1.28] - 17/12/2020

### Updated

- fixed text

## [0.1.27] - 05/12/2020

### Updated

- fixed text

## [0.1.26] - 10/11/2020

### Updated

- dependencies

## [0.1.25] - 21/10/2020

### Updated

- context get parent

## [0.1.24] - 07/10/2020

### Updated

- bug fixes

## [0.1.23] - 29/09/2020

### Updated

- bug fixes

## [0.1.22] - 23/09/2020

### Updated

- bug fixes

## [0.1.21] - 23/09/2020

### Updated

- bug fixes

## [0.1.20] - 23/09/2020

### Updated

- Updated getHTML

## [0.1.19] - 23/09/2020

### Updated

- changed selector

## [0.1.18] - 20/08/2020

### Updated

- bug fixes

## [0.1.17] - 16/08/2020

### Updated

- deleted treeSelector

## [0.1.16] - 27/07/2020

### Updated

- dependencies
- getElementSelector

## [0.1.15] - 27/07/2020

### Updated

- dependencies

## [0.1.14] - 10/07/2020

### Updated

- css mapping

## [0.1.13] - 10/07/2020

### Updated

- dependencies

## [0.1.12] - 09/07/2020

### Added

- hasTextNode function

## [0.1.11] - 09/07/2020

### Added

- css rules mapping manipulation functions

## [0.1.10] - 06/07/2020

### Updated

- fixed cached selector

## [0.1.9] - 06/07/2020

### Updated

- cached selector

## [0.1.8] - 06/07/2020

### Updated

- dependencies

## [0.1.7] - 22/06/2020

### Added

- css rules mapping to each element

## [0.1.6] - 22/06/2020

### Added

- ShadowDom functions

## [0.1.5] - 29/05/2020

### Updated

- dependencies

## [0.1.4] - 28/05/2020

### Updated

- dependencies

## [0.1.3] - 27/05/2020

### Added

- getBoundingBox method

## [0.1.2] - 20/05/2020

### Fixed

- changed types
