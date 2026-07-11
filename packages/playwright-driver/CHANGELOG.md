# @qualweb/playwright-driver

## 1.0.0

### Minor Changes

- c0fc13a: New package: a Playwright browser-automation driver for QualWeb. Pass it to
  the QualWeb constructor (`new QualWeb(undefined, new PlaywrightDriver())`) to
  run evaluations with Playwright's chromium, firefox or webkit instead of the
  bundled Puppeteer, sharing an application's existing Playwright installation.

### Patch Changes

- Updated dependencies [3a81513]
  - @qualweb/core@0.9.0
