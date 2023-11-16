# Changelog

## 0.6.16

### Patch Changes

- bd701ab: # Fix up unit tests

  - `rule.spec.mjs`
    - Now runs _all_ QualWeb rules by default (to fit within an automated workflow)
    - Updated URL for testcases to: https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json
    - Changed use of test cases so they are read from a fixture (`test/fixtures/testcases.json`). This is intended to make sure that the package's code can be documented to have a certain result when compared to a _specific_ set of test cases in time. The test cases can still be updated simply by overwriting the fixture with a newly downloaded copy. Consider writing a convenience script to do this?
    - Adjusted tests so they pass if they fall within the acceptable range of outcomes, not the exact expected outcome. For example, if an ACT testcase should pass, the equivalent unit test will pass if the outcome is one of "passed", "cantTell", or "inapplicable".
    - Any "warning" outcome will be converted to "cantTell" to fit EARL specs.
  - The overall structure of the tests have been mildly refactored to fit better unit testing practices.
    - Puppeteer launch/close is put into setup/teardown functions (`before` and `after`).
    - Added a file for utility functions. Initially, just a `launchBrowser()` function to unify the way Puppeteer gets launched across unit tests.
  - Added .mocharc.js file to specify unit test configuration.
  - Removed the following QualWeb rules from the test suite:
    - QW-ACT-R8
    - QW-ACT-R45

- 2673ce6: # Add changesets and Github Actions

  Under most circumstances I don't think you'd commit an entire package version to changes in the CI/CD configuration. I think the initial addition of the flows warrant a changeset, however, since it demonstrates basic usage and should allow a test run to make sure everything works as intended.

## [0.6.15] - 27/09/2023

### Updated

- r24,r28

## [0.6.14] - 19/06/2023

### Updated

- r30

## [0.6.13] - 30/05/2023

### Updated

- dependencies

## [0.6.12] - 30/05/2023

### Deleted

- r72

## [0.6.11] - 01/02/2023

### Updated

- r38, r5, r12, r13, r24 and r68

## [0.6.10] - 17/01/2022

### Updated

- r38 and r5

## [0.6.9] - 25/05/2022

### Updated

- rules.json metadata

## [0.6.8] - 26/01/2022

### Updated

- rules.json metadata

## [0.6.7] - 10/12/2021

### Updated

- dependencies

## [0.6.6] - 03/12/2021

### Updated

- Rule QW-ACT-R22

## [0.6.5] - 20/10/2021

### Updated

- dependencies

### Fixed

- known bugs

## [0.6.4] - 01/10/2021

### Added

- new code a description for rules QW-ACT-R4 and QW-ACT-R71. You can now differentiate between refresh and redirect errors

## [0.6.3] - 29/09/2021

### Merged

- PR#5 (Added links to the WCAG rules (in addition to the understanding links))

### Updated

- dependencies

## [0.6.2] - 28/07/2021

### Updated

- dependencies

## [0.6.1-alpha] - 27/07/2021

### Updated

- translations
- dependencies

## [0.5.10] - 22/07/2021

### Updated

- QW-ACT-R35
- QW-ACT-R37
- QW-ACT-R76

## [0.5.9] - 30/05/2021

### Fixed

- QW-ACT-R74 bug

### Updated

- dependencies

## [0.5.8] - 25/05/2021

### Fixed

- QW-ACT-R33 bug

## [0.5.7] - 19/05/2021

### Fixed

- QW-ACT-R72 bug

## [0.6.0-alpha] - 05/05/2021

### Added

- localization support

## [0.5.6] - 27/04/2021

### Fixed

- QW-ACT-R30 bug

## [0.5.5] - 23/04/2021

### Fixed

- QW-ACT-R72 bug

### Updated

- dependencies

## [0.5.4] - 14/04/2021

### Updated

- dependencies

## [0.5.3] - 30/03/2021

### Updated

- dependencies
- code refactored
- bugs fixed

### Removed

- QW-ACT-R8 since it was deprecated
- most inapplicable results from the report for most rules

## [0.5.2] - 27/03/2021

### Updated

- dependencies

## [0.5.1] - 27/03/2021

### Fixed

- issue with webpack config

## [0.5.0] - 25/03/2021

### Updated

- dependencies
- code refactored
- webpack config
- package.json

## [0.4.57] - 11/03/2021

### Fixed

- rule QW-ACT-R62
  - should not crash when the page doesn't have a body element

## [0.4.56] - 11/03/2021

### Fixed

- rule QW-ACT-R43
  - invisible elements should now be inapplicable

## [0.4.55] - 08/03/2021

### Fixed

- rule QW-ACT-R37 and QW-ACT-R76
  - shouldn't give more false positives

## [0.4.54] - 08/03/2021

### Updated

- dependencies

### Fixed

- known bugs

## [0.4.53] - 02/03/2021

### Fixed

- known bugs

## [0.4.52] - 01/03/2021

### Updated

- dependencies

## [0.4.51] - 25/02/2021

### Added

- "exclude" option to exclude rules to execute

## [0.4.50] - 25/02/2021

### Added

- QW-ACT-R63 atomic rule
- QW-ACT-R64 atomic rule
- QW-ACT-R73 atomic rule
- QW-ACT-R74 atomic rule
- QW-ACT-R75 composite rule
- QW-ACT-R76 atomic rule

### Fixed

- QW-ACT-R20 bugs

## [0.4.49] - 17/02/2021

### Updated

- README.md

## [0.4.48] - 17/02/2021

### Updated

- dependencies

## [0.4.47] - 08/02/2021

### Fixed

- known bugs

### Updated

- dependencies

## [0.4.46] - 08/02/2021

### Added

- ACT-R70 - frame with negative tabindex has no interactive elements

## [0.4.44] - 25/01/2021

### Updated

- Mapping
- dependencies

### Removed

- unnecessary libraries

## [0.4.43] - 25/01/2021

### Updated

- remove r45

## [0.4.42] - 23/01/2021

### Fixed

- fixed r67, r68, r69

### Added

- ACT-R71 - `meta` element has no refresh delay (no exception)
- ACT-R72 - First focusable element is link to non-repeated content

## [0.4.41] - 14/01/2021

### Updated

- fixed r22

## [0.4.40] - 11/01/2021

### Updated

- dependencies

## [0.4.39] - 08/01/2021

### Updated

- dependencies
- webpack config
- rules tests

### Removed

- QW-ACT-R47

## [0.4.38] - 06/01/2021

### Updated

- dependencies

### Added

ACT-R65 - Element with presentational children has no focusable content
ACT-R66 - Menuitem has non-empty accessible name
ACT-R67 - Letter spacing in style attributes is not !important
ACT-R68 - Line height in style attributes is not !important
ACT-R69 - Word spacing in style attributes is not !important

## [0.4.37] - 13/12/2020

###Fixed
-bug fixes

## [0.4.36] - 05/12/2020

### Updated

- dependencies

## [0.4.35] - 10/11/2020

### Added

ACT-R62 - Element in sequential focus order has visible focus

## [0.4.34] - 10/11/2020

### Fixed

- type definitions

### Updated

- dependencies

## [0.4.33] - 05/11/2020

### Fixed

- bug fixes

## [0.4.32] - 30/10/2020

### Fixed

- bug fixes

## [0.4.31] - 27/10/2020

### Fixed

- bug fixes

## [0.4.30] - 03/10/2020

### Fixed

- bug fixes

## [0.4.29] - 23/09/2020

### Fixed

- bug fixes

## [0.4.28] - 22/09/2020

### Fixed

- updated util

## [0.4.27] - 17/09/2020

### Fixed

- changed r45 to owner element

## [0.4.26] - 08/09/2020

### Fixed

- multiple bugs fixes

## [0.4.25] - 27/08/2020

### Fixed

- multiple bugs and optimized performance

## [0.4.24] - 21/08/2020

### Fixed

- multiple bugs and optimized performance

## [0.4.23] - 16/08/2020

### Fixed

- ePortugal bug

## [0.4.22] - 29/07/2020

### Fixed

- known bugs

## [0.4.21] - 28/07/2020

### Fixed

- known bugs

## [0.4.20] - 28/07/2020

### Fixed

- known bugs

### Updated

- dependencies

## [0.4.19] - 27/07/2020

### Fixed

- known bugs

### Updated

- dependencies

## [0.4.18] - 20/07/2020

### Fixed

- AcessibleNames on report in R8 and R17

## [0.4.17] - 10/07/2020

### Fixed

- QW-ACT-R7

## [0.4.16] - 10/07/2020

### Added

- cache

## [0.4.15] - 02/07/2020

### Added

- rules QW-ACT-R45, QW-ACT-R46, QW-ACT-R47

### Updated

- dependencies
- README.md

## [0.4.14] - 25/06/2020

### Updated

- fixed R37

## [0.4.13] - 23/06/2020

### Updated

- bug fixes

## [0.4.12] - 21/06/2020

### Updated

- updated util

## [0.4.11] - 08/06/2020

### Updated

- multiple bug fixes

## [0.4.10] - 08/06/2020

### Updated

- deleted process shadowDom

## [0.4.9] - 08/06/2020

### Updated

- deleted log

## [0.4.8] - 08/06/2020

### Updated

- fixed isDocument

## [0.4.7] - 08/06/2020

### Updated

- updated dependencies, fixed bugs and added rules 40 to 44

## [0.4.6] - 29/05/2020

### Updated

- updated dependencies and bug fixes

## [0.4.5] - 20/05/2020

### Updated

- changed structure from rules to assertions

## [0.4.4] - 19/05/2020

### Updated

- bug fixed video service

## [0.4.3] - 19/05/2020

### Updated

- bug fixes

## [0.4.2] - 19/05/2020

### Updated

- fixed r17 and r10

## [0.4.0] - 10/05/2020

### Updated

- new arquitecture

## [0.3.39] - 13/05/2020

### Fixed

- maxParallelEvaluations bug

## [0.3.38] - 11/05/2020

### Fixed

- maxParallelEvaluations bug
- QW-ACT-R17 bugs
- QW-ACT-R30 bugs

## [0.3.37] - 07/05/2020

### Fixed

- removed IsNotMathDocument decorator

## [0.3.36] - 06/05/2020

### Fixed

- a bug in IsNotMathDocument decorator

## [0.3.35] - 06/05/2020

### Fixed

- a bug in IsNotMathDocument decorator

## [0.3.34] - 06/05/2020

### Added

- accessible name result for rules R6, R8, R11, R12, R16, R17, R19, R21, R30, R35

### Updated

- dependencies
- report interface
- tests

## [0.3.33] - 22/04/2020

### Updated

- rule QW-ACT-R37

## [0.3.32] - 14/04/2020

### Updated

- some rules

## [0.3.31] - 14/04/2020

### Fixed

- some bugs

## [0.3.30] - 19/03/2020

### Updated

- @qualweb/util

## [0.3.30] - 18/03/2020

### Updated

- @qualweb/util

## [0.3.29] - 18/03/2020

### Updated

- @qualweb/util

## [0.3.28] - 18/03/2020

### Added

- rule QW-ACT-R37

## [0.3.27] - 21/02/2020

### Fixed

- some bugs

## [0.3.26] - 17/02/2020

### Fixed

- some bugs

## [0.3.25] - 17/02/2020

### Tested

- fixes

## [0.3.25] - 12/02/2020

### Added

- fixed rule 16,24,30

## [0.3.24] - 10/02/2020

### Added

- rule QW-ACT-R38
- rule QW-ACT-R39

### Updated

- README.md

## [0.3.23] - 06/02/2020

### Changed

- SourceHtml interface

## [0.3.22] - 29/01/2020

### Updated

- @qualweb/util
- @qualweb/types

### Fixed

- some rules bugs

## [0.3.21] - 29/01/2020

### Updated

- rule QW-ACT-R9
- rule QW-ACT-R10
- rule QW-ACT-R33

### Fixed

- rule QW-ACT-R16 outcomes

### Removed

- unused dependencies

## [0.3.20] - 28/01/2020

### Updated

- rules descriptions

## [0.3.19] - 23/01/2020

### Updated

- refactored getElementName to getElementTagName
- refactored AccessibilityTreeUtils to AccessibilityUtils
- refactored getElemenVisible to getElementVisible

## [0.3.18] - 22/01/2020

### Updated

- rule QW-ACT-R6

## [0.3.17] - 21/01/2020

### Updated

- rules that run by default

## [0.3.16] - 20/01/2020

### Added

- rule QW-ACT-R35

## [0.3.15] - 17/01/2020

### Added

- rule QW-ACT-R29
- rule QW-ACT-R32

### Updated

- README.md

### Fixed

- QW-ACT-R34 bugs

## [0.3.14] - 15/01/2020

### Updated

- @qualweb/util module

## [0.3.13] - 14/01/2020

### Fixed

- rule QW-ACT-R31 mapping

### Updated

- README.md

## [0.3.12] - 14/01/2020

### Added

- QW-ACT-R24 rule
- QW-ACT-R25 rule
- QW-ACT-R26 rule
- QW-ACT-R27 rule
- QW-ACT-R28 rule
- QW-ACT-R31 rule
- QW-ACT-R33 rule
- QW-ACT-R34 rule

### Updated

- README.md

## [0.3.11] - 13/01/2020

### Added

- QW-ACT-R15 rule

### Updated

- @qualweb/util module

## [0.3.10] - 09/01/2020

### Fixed

- a bug in rule QW-ACT-R30

## [0.3.9] - 08/01/2020

### Added

- QW-ACT-R30 rule

## [0.3.8] - 08/01/2020

### Fixed

- QW-ACT-R18 bug

## [0.3.7] - 08/01/2020

### Updated

- QW-ACT-R7 rule
- README.md

## [0.3.6] - 07/01/2020

### Updated

- README.md

## [0.3.5] - 07/01/2020

### Changed

- rules architecture

## [0.3.4] - 07/01/2020

### Testing

- QW-ACT-R1 changes

## [0.3.3] - 07/01/2020

### Fixed

- some bugs

## [0.3.2] - 07/01/2020

### Changed

- rule object creation

## [0.3.1] - 07/01/2020

### Fixed

- some bugs

## [0.3.0] - 07/01/2020

### Updated

- module architecture

## [0.2.7] - 07/01/2020

### Fixed

- a bug where the report had incorrect values

## [0.2.6] - 07/01/2020

### Fixed

- a bug where the report had incorrect values

## [0.2.5] - 06/01/2020

### Fixed

- QW-ACT-R18 bug

## [0.2.4] - 06/01/2020

### Fixed

- QW-ACT-R18 bug

## [0.2.3] - 06/01/2020

### Fixed

- some rules issues

## [0.2.2] - 04/12/2019

### Added

- rules QW-ACT-R17 and QW-ACT-R19

## [0.2.1] - 03/12/2019

### Updated

- added R9 and R10

## [0.2.0] - 02/12/2019

### Updated

- all rules to work with new core architecture

## [0.1.9] - 18/11/2019

### Fixed

- Fix dependencies

## [0.1.8] - 29/10/2019

### Fixed

- Added R20,R21,R22

## [0.1.7] - 29/10/2019

### Fixed

- a QW-ACT-R2 bug

## [0.1.6] - 29/10/2019

### Fixed

- other bugs

## [0.1.5] - 29/10/2019

### Fixed

- missing package @qualweb/util

## [0.1.4] - 29/10/2019

### Added

- rules 6, 8-14, 18 to the implemented rules

## [0.1.3] - 17/10/2019

### Updated

- all rules so that they can have an outcome = warning

## [0.1.2] - 11/10/2019

### Added

- QW-ACT-R7 rule

### Fixed

- several bugs

## [0.1.0] - 10/10/2019

### Fixed

- bugs on rule QW-ACT-R2
- bugs on rule QW-ACT-R5

### Changed

- tests file to automatically download test cases

## [0.0.6] - 07/10/2019

### Changed

- transform_element_into_html function to remove unnecessary element attributes

## [0.0.5] - 09/09/2019

### Added

- Rule.object.ts which has the main class to extended by the implemented rules

### Changed

- all rules under src/rules/QW-ACT-R\*.ts to extend the Rule abstract class

## [0.0.4] - 04/09/2019

### Changed

- moved variables "rules" and "rules_to_execute" from file "index.ts" to a separate file "rules.ts"
- "rules_to_execute" variable to "rulesToExecute"
- code optimization

### Updated

- package @types/lodash to version 4.14.138
- package @types/node to version 12.7.2
- package tslint to version 5.19.0
- package typescript to version 3.6.2

## [0.0.3] - 12/08/2019

### Added

- metadata structure to ACTRulesReport
- "mocha" framework
- testing files, one for each implemented rule

### Changed

- ACTResult to ACTRuleResult in all 5 rules (rules/QW-ACT-R\*.ts file)
- "How to run" section on the README.md file

### Updated

- package @qualweb/types to version 0.0.32
- package @qualweb/get-dom-puppeteer to version 0.0.2
