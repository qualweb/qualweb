---
"@qualweb/core": major
"@qualweb/cli": major
"@qualweb/playwright-driver": major
"@qualweb/puppeteer-driver": minor
---

Make Playwright Chromium the default browser backend and isolate Puppeteer support in the new, explicitly installed `@qualweb/puppeteer-driver` package. Remove the abandoned Puppeteer-extra plugins and their vulnerable transitive dependency chains instead of maintaining downstream patches.

This is a breaking migration:

- Core, CLI, and the Playwright compatibility package require Node.js 20 or newer. The optional Puppeteer driver requires Node.js 22.12 or newer.
- Install Chromium with `npx playwright install chromium` before using the default backend.
- `QualWeb.start()` accepts Playwright launch options, and native-page plugins receive a Playwright `Page`. Migrate Puppeteer-specific options and plugin APIs, or explicitly configure the optional Puppeteer driver.
- The removed stealth plugin and the default pool's unsupported `monitor: true` option now produce explicit errors.
- Ad blocking uses Ghostery's Playwright integration. The existing Playwright driver package re-exports the implementation included in core.
- Async plugin hooks are awaited in registration order. Pool deadlines include page setup, timed-out jobs release their contexts, and shutdown cancels active jobs and settles idle waiters.

The evaluation report API is preserved. Cross-driver regression tests compare ACT rules, WCAG techniques, best practices, and counter results for URL and raw-HTML inputs.
