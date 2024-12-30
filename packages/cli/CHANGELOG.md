# Changelog

## 0.7.3

### Patch Changes

- 40efb72: Updated repository, bugs, and homepage fields for all package.json files
- Updated dependencies [63a0b5d]
- Updated dependencies [40efb72]
  - @qualweb/core@0.8.2
  - @qualweb/wcag-techniques@0.4.2
  - @qualweb/best-practices@0.7.3
  - @qualweb/earl-reporter@0.5.2
  - @qualweb/act-rules@0.7.2
  - @qualweb/counter@0.3.2

## 0.7.2

### Patch Changes

- 38078bb: Clean up build scripts
- 38078bb: Update build scripts

  Removed the cleanup step of all build scripts and added a "clean" script for
  them all instead. This change means that the build scripts will no longer create
  a clean output folder. Since the output folders aren't under version control,
  this won't mess with history, and CI/CD pipelines should build from a clean
  checkout so this shouldn't cause pollution in final releases, either.

- Updated dependencies [38078bb]
- Updated dependencies [38078bb]
  - @qualweb/core@0.8.1
  - @qualweb/wcag-techniques@0.4.1
  - @qualweb/best-practices@0.7.2
  - @qualweb/earl-reporter@0.5.1
  - @qualweb/act-rules@0.7.1
  - @qualweb/counter@0.3.1

## 0.7.1

### Patch Changes

- Updated dependencies [cef0718]
  - @qualweb/best-practices@0.7.1

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

### Patch Changes

- Updated dependencies [f7c46a2]
  - @qualweb/wcag-techniques@0.4.0
  - @qualweb/best-practices@0.7.0
  - @qualweb/earl-reporter@0.5.0
  - @qualweb/act-rules@0.7.0
  - @qualweb/counter@0.3.0
  - @qualweb/core@0.8.0

## 0.6.40

### Patch Changes

- @qualweb/core@0.7.80

## 0.6.39

### Patch Changes

- @qualweb/core@0.7.79

## 0.6.38

### Patch Changes

- @qualweb/core@0.7.78

## 0.6.37

### Patch Changes

- @qualweb/core@0.7.77

## 0.6.36

### Patch Changes

- @qualweb/core@0.7.76

## 0.6.35

### Patch Changes

- @qualweb/core@0.7.75

## 0.6.34

### Patch Changes

- @qualweb/core@0.7.74

## 0.6.33

### Patch Changes

- @qualweb/core@0.7.73

## 0.6.32

### Patch Changes

- 4c764f07: Fix modules available to cli
  - @qualweb/core@0.7.72

## 0.6.31

### Patch Changes

- @qualweb/core@0.7.71

## 0.6.30

### Patch Changes

- @qualweb/core@0.7.70

## 0.6.29

### Patch Changes

- @qualweb/core@0.7.69

## 0.6.28

### Patch Changes

- Updated dependencies [375f20c3]
- Updated dependencies [636b402e]
- Updated dependencies [eb596a97]
  - @qualweb/core@0.7.68

## 0.6.27

### Patch Changes

- @qualweb/core@0.7.67

## 0.6.26

### Patch Changes

- @qualweb/core@0.7.66

## 0.6.25

### Patch Changes

- @qualweb/core@0.7.65

## 0.6.24

### Patch Changes

- Updated dependencies [3ef622f7]
- Updated dependencies [7801f294]
  - @qualweb/core@0.7.64

## 0.6.23

### Patch Changes

- @qualweb/core@0.7.63

## 0.6.22

### Patch Changes

- 47d679d3: Create QW-ACT-R77
- Updated dependencies [47d679d3]
  - @qualweb/core@0.7.62

## 0.6.21

### Patch Changes

- @qualweb/core@0.7.61

## 0.6.20

### Patch Changes

- @qualweb/core@0.7.60

## 0.6.19

### Patch Changes

- @qualweb/core@0.7.59

## 0.6.18

### Patch Changes

- @qualweb/core@0.7.58

## 0.6.17

### Patch Changes

- @qualweb/core@0.7.57

## 0.6.16

### Patch Changes

- @qualweb/core@0.7.56

## 0.6.15

### Patch Changes

- @qualweb/core@0.7.55

## 0.6.14

### Patch Changes

- @qualweb/core@0.7.54

## 0.6.13

### Patch Changes

- 295f35f: Updated dependencies (eslint, prettier, typedoc, mocha)
- Updated dependencies [295f35f]
  - @qualweb/core@0.7.53

## 0.6.12

### Patch Changes

- @qualweb/core@0.7.52

## 0.6.11

### Patch Changes

- @qualweb/core@0.7.51

## 0.6.10

### Patch Changes

- @qualweb/core@0.7.50

## 0.6.9

### Patch Changes

- @qualweb/core@0.7.49

## 0.6.8

### Patch Changes

- 550429b: Monorepo release test
- Updated dependencies [550429b]
  - @qualweb/core@0.7.48

## 0.6.7

### Patch Changes

- 315d70c: Changed prettier command argument
- Updated dependencies [315d70c]
  - @qualweb/core@0.7.47

## [0.6.5] - 22/06/2022

### Updated

- dependencies

## [0.6.4] - 23/07/2021

### Updated

- dependencies

## [0.6.3] - 22/07/2021

### Updated

- dependencies

## [0.6.2] - 21/07/2021

### Updated

- dependencies

## [0.6.1] - 31/04/2021

### Updated

- dependencies
- README.md

### Fixed

- error when using option "-m wcag"

## [0.5.2] - 23/04/2021

### Fixed

- save-name option not working

### Updated

- dependencies

## [0.5.1] - 31/03/2021

### Updated

- dependencies
- code optimized

## [0.5.0] - 23/03/2021

### Updated

- @qualweb/core to version 0.5.1

## [0.4.16] - 23/03/2021

### Updated

- dependencies

## [0.4.15] - 22/03/2021

### Updated

- dependencies

## [0.4.14] - 11/03/2021

### Updated

- dependencies
- README.md

## [0.4.13] - 10/03/2021

### Updated

- dependencies

## [0.4.12] - 10/03/2021

### Added

- support for counting elements and roles

## [0.4.11] - 08/03/2021

### Updated

- dependencies

## [0.4.10] - 01/03/2021

### Updated

- dependencies

## [0.4.9] - 27/02/2021

### Updated

- dependencies

## [0.4.8] - 27/02/2021

### Added

- new options to exclude rules/techniques/best-practices from executing

### Updated

- README.md

## [0.4.7] - 25/02/2021

### Added

- support for new rules

## [0.4.6] - 25/02/2021

### Updated

- dependencies
- README.md

## [0.4.5] - 20/02/2021

### Updated

- dependencies
- README.md
- list of available act rules

## [0.4.4] - 25/01/2021

### Updated

- dependencies

## [0.4.3] - 25/01/2021

### Updated

- dependencies

## [0.4.2] - 25/01/2021

### Updated

- dependencies

## [0.4.1] - 06/01/2021

### Added

- eslint

### Updated

- dependencies

## [0.4.0] - 16/12/2020

### Updated

- compatibility with wcag-techniques module
- dependencies

## [0.3.39] - 12/10/2020

### Updated

- dependencies

## [0.3.38] - 12/10/2020

### Updated

- dependencies

## [0.3.37] - 09/10/2020

### Updated

- dependencies
- code refactor

## [0.3.36] - 23/09/2020

### Updated

- dependencies

## [0.3.35] - 16/09/2020

### Updated

- dependencies

## [0.3.34] - 25/08/2020

### Updated

- dependencies

## [0.3.33] - 29/07/2020

### Updated

- dependencies

## [0.3.32] - 28/07/2020

### Fixed

- known bugs

### Updated

- dependencies

## [0.3.31] - 27/07/2020

### Updated

- dependencies

## [0.3.30] - 13/07/2020

### Updated

- dependencies

## [0.3.29] - 03/07/2020

### Updated

- dependencies

## [0.3.28] - 03/07/2020

### Updated

- README.md

## [0.3.27] - 03/07/2020

### Updated

- dependencies

## [0.3.26] - 23/06/2020

### Fixed

- Updated core

## [0.3.25] - 15/06/2020

### Fixed

- Updated core

## [0.3.23] - 15/06/2020

### Fixed

- a bug where act rule ids were invalid

## [0.3.22] - 08/06/2020

### Updated

- Updated core

## [0.3.21] - 08/06/2020

### Updated

- Updated core

## [0.3.20] - 06/05/2020

### Updated

- dependencies

## [0.3.19] - 06/05/2020

### Updated

- dependencies

## [0.3.18] - 05/05/2020

### Added

- viewport options
- possibility of using config files

### Updated

- parser
- README.md

## [0.3.17] - 23/04/2020

### Fixed

- some bugs

## [0.3.16] - 22/04/2020

### Fixed

- a bug

## [0.3.15] - 22/04/2020

### Updated

- @qualweb/core
- CLI interface
- @qualweb/types

## [0.3.14] - 19/03/2020

### Updated

- @qualweb/core

## [0.3.13] - 18/03/2020

### Updated

- @qualweb/core

## [0.3.12] - 21/02/2020

### Updated

- @qualweb/core

## [0.3.12] - 17/02/2020

### Updated

- @qualweb/core

## [0.3.11] - 22/01/2020

### Updated

- @qualweb/core

## [0.3.10] - 21/01/2020

### Updated

- @qualweb/core

## [0.3.9] - 17/01/2020

### Updated

- @qualweb/core

## [0.3.8] - 17/01/2020

### Fixed

- a bug where the rules were not correctly parsed

## [0.3.7] - 15/01/2020

### Added

- option to change the name of th file of the aggregated earl reports

### Updated

- @qualweb/core
- README.md

## [0.3.6] - 14/01/2020

### Updated

- @qualweb/core
- README.md

## [0.3.5] - 13/01/2020

### Updated

- @qualweb/core

## [0.3.4] - 09/01/2020

### Updated

- @qualweb/core

### Fixed

- some bugs

## [0.3.3] - 08/01/2020

### Updated

- @qualweb/core

## [0.3.2] - 08/01/2020

### Fixed

- dependencies

## [0.3.1] - 08/01/2020

### Updated

- @qualweb/core

## [0.3.0] - 08/01/2020

### Updated

- @qualweb/core
- README.md

## [0.2.5] - 03/12/2019

### Removed

- unnecessary files

## [0.2.4] - 03/12/2019

### Update

- core engine

## [0.2.3] - 02/12/2019

### Update

- core engine

## [0.2.2] - 02/12/2019

### Fixed

- a bug when trying to save the reports

## [0.2.1] - 02/12/2019

### Fixed

- a bug when trying to run specific modules

## [0.2.0] - 02/12/2019

### Added

- best-practices modules configuration options

### Updated

- core engine

## [0.1.0] - 04/11/2019

### Updated

- package @qualweb/core to version 0.1.6

## [0.0.3] - 12/08/2019

### Added

- "mocha" framework

### Updated

- package @qualweb/types to version 0.0.32
- package @qualweb/core to version 0.0.3
- package @types/node to version 12.7.1
- package commander to version 3.0.0
