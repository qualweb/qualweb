# @qualweb/playwright-driver

## 1.0.1

### Patch Changes

- 1a09792: Keep the loaded document when the user agent or viewport flags change mid-evaluation. Previously the driver recreated its browser context on any such change; when `evaluate()` was called without a `viewport` option, `QualwebPage.setViewport` re-sends the default user agent during the ACT rules module's special-case viewport pass, and the recreation destroyed the loaded page and every injected bundle — the evaluation then failed (`window.act` undefined) and the URL produced no report. Context recreation now only happens while no document is loaded; afterwards, resizes apply to the live page and user-agent/flag changes are kept for a later context.
  - @qualweb/core@0.9.3

## 1.0.0

### Minor Changes

- c0fc13a: New package: a Playwright browser-automation driver for QualWeb. Pass it to
  the QualWeb constructor (`new QualWeb(undefined, new PlaywrightDriver())`) to
  run evaluations with Playwright's chromium, firefox or webkit instead of the
  bundled Puppeteer, sharing an application's existing Playwright installation.

### Patch Changes

- Updated dependencies [3a81513]
  - @qualweb/core@0.9.0
