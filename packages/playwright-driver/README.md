# QualWeb Playwright driver

Playwright is now the default browser backend in `@qualweb/core`. This package
is a compatibility re-export, so existing imports of `PlaywrightDriver`,
`PlaywrightDriverPage`, `PlaywrightDriverPool`, and `mapLoadEvent` still work.
New applications can import these directly from `@qualweb/core`.

Requires Node.js 20 or newer.

```sh
npm install @qualweb/core @qualweb/playwright-driver playwright
npx playwright install chromium
```

```typescript
import { QualWeb, PlaywrightDriver } from '@qualweb/core';

const driver = new PlaywrightDriver({
  browser: 'chromium', // 'firefox' and 'webkit' are also available
  launchOptions: { headless: true },
  adBlock: true,
});
const qualweb = new QualWeb(undefined, driver);
await qualweb.start({ maxConcurrency: 4 });
try {
  const reports = await qualweb.evaluate({ url, modules });
} finally {
  await qualweb.stop();
}
```

Install the corresponding Playwright browser before choosing Firefox or WebKit.
Options passed as the second argument of `start()` override the driver's
constructor launch options. The default pool does not support Puppeteer's
cluster monitor; `monitor: true` throws.

The pool's `timeout` covers page setup as well as evaluation. Timed-out jobs
report an error, close their context, and release the concurrency slot for the
next queued job. Closing the pool cancels active jobs, discards pending jobs,
and settles existing `idle()` waiters. User hooks must still arrange cancellation
of any external work they start; closing a browser cannot cancel arbitrary
JavaScript promises.

Ad blocking uses Ghostery's full ads, tracking, and annoyances lists. For offline
or custom lists, pass a `PlaywrightBlocker` from `@ghostery/adblocker-playwright`
as `blocker`. Blocking is applied to evaluation and crawler pages, including
replacement contexts for user-agent/mobile settings. Filter setup errors are
propagated; failed evaluation jobs use QualWeb's existing error manager.

The abandoned stealth and Puppeteer-extra integrations are not used. Passing
`stealth: true` to QualWeb throws a migration error.

## Browser compatibility

- `networkidle0` and `networkidle2` map to Playwright `networkidle`; arrays
  collapse to the strongest event.
- Context-only user-agent, CSP, device scale, mobile, and touch settings recreate
  the context before navigation. Set these before loading the document.
  Mid-evaluation dimension changes preserve the loaded document and injected
  scripts.
- Plugins receive a neutral driver page. `nativePage` is a Playwright `Page`.
- `QualWeb.createPage()` accepts the neutral adapter, not a raw automation page.

See the [migration guide](../../README.md) and
[optional Puppeteer backend](../puppeteer-driver/README.md).

## Migration regression tests

After building the monorepo and installing Chromium, run:

```sh
npm test --workspace @qualweb/playwright-driver
npm test --workspace @qualweb/puppeteer-driver
npm test --workspace @qualweb/cli
npm run test:dependencies
```

The local-fixture suites check pool bounds, job isolation, timeout/setup/shutdown
cleanup, plugin hooks, navigation, crawling, and CLI output. Cross-driver tests
compare ACT, WCAG, best-practice, and counter reports under the implicit default
and optional Puppeteer backend, using both URLs without explicit viewports and
raw HTML. These deterministic checks do not replace live-site or cross-browser
certification.

## License

ISC
