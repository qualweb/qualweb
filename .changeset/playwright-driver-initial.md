---
"@qualweb/playwright-driver": minor
---

New package: a Playwright browser-automation driver for QualWeb. Pass it to
the QualWeb constructor (`new QualWeb(undefined, new PlaywrightDriver())`) to
run evaluations with Playwright's chromium, firefox or webkit instead of the
bundled Puppeteer, sharing an application's existing Playwright installation.
