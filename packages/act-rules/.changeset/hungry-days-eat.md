---
'@qualweb/act-rules': patch
---

# Fix up unit tests

- `rule.spec.mjs`
  - Now runs *all* QualWeb rules by default (to fit within an automated workflow)
  - Updated URL for testcases to: https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json
  - Changed use of test cases so they are read from a fixture (`test/fixtures/testcases.json`). This is intended to make sure that the package's code can be documented to have a certain result when compared to a *specific* set of test cases in time. The test cases can still be updated simply by overwriting the fixture with a newly downloaded copy. Consider writing a convenience script to do this?
  - Adjusted tests so they pass if they fall within the acceptable range of outcomes, not the exact expected outcome. For example, if an ACT testcase should pass, the equivalent unit test will pass if the outcome is one of "passed", "cantTell", or "inapplicable".
  - Any "warning" outcome will be converted to "cantTell" to fit EARL specs.
- The overall structure of the tests have been mildly refactored to fit better unit testing practices.
  - Puppeteer launch/close is put into setup/teardown functions (`before` and `after`).
  - Added a file for utility functions. Initially, just a `launchBrowser()` function to unify the way Puppeteer gets launched across unit tests.
- Added .mocharc.js file to specify unit test configuration.
- Removed the following QualWeb rules from the test suite:
  - QW-ACT-R8
  - QW-ACT-R45

