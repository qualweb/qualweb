# QualWeb Playwright driver

[Playwright](https://playwright.dev) browser-automation driver for the
[QualWeb](https://github.com/qualweb/qualweb) accessibility evaluator.

By default, `@qualweb/core` drives browsers with Puppeteer (plus
puppeteer-cluster). This package provides a drop-in alternative driver that
uses Playwright instead. Reasons you might want that:

- your application already ships Playwright (and its managed browsers), and
  you don't want a second browser stack;
- you need launch/context options or environments that the bundled Puppeteer
  Chromium struggles with;
- you want to run QualWeb's engine in Firefox or WebKit.

## How to install

```shell
$ npm i @qualweb/core @qualweb/playwright-driver playwright --save
$ npx playwright install chromium
```

`playwright` is a peer dependency, so QualWeb always uses the same Playwright
version (and browsers) as the rest of your application.

## How to run

Pass the driver to the `QualWeb` constructor. Everything else - `start()`,
`evaluate()`, `stop()`, `crawl()`, plugins, modules - works exactly as with
the default Puppeteer driver.

```javascript
const { QualWeb } = require('@qualweb/core');
const { ACTRulesModule } = require('@qualweb/act-rules');
const { PlaywrightDriver } = require('@qualweb/playwright-driver');

(async () => {
  const driver = new PlaywrightDriver({
    browser: 'chromium', // or 'firefox' / 'webkit'
    launchOptions: { headless: true },
  });

  const qualweb = new QualWeb(undefined, driver);

  await qualweb.start({ maxConcurrency: 4 });

  const reports = await qualweb.evaluate({
    url: 'https://act-rules.github.io/pages/about/',
    modules: [new ACTRulesModule()],
  });

  await qualweb.stop();

  console.log(reports);
})();
```

Note that browser launch options are given to the driver at construction
time. The optional second argument of `QualWeb.start()` carries *Puppeteer*
launch options for the default driver and is ignored by this one.

### Stealth / adblock plugins

The default driver's `{ stealth: true, adBlock: true }` constructor options
are Puppeteer-extra plugins. For parity, hand the driver a
[playwright-extra](https://www.npmjs.com/package/playwright-extra) browser as
a custom launcher:

```javascript
const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

chromium.use(StealthPlugin());

const driver = new PlaywrightDriver({ launcher: chromium });
```

## Behavior differences from the Puppeteer driver

The driver maps QualWeb's Puppeteer-shaped expectations onto Playwright:

- `waitUntil: 'networkidle0'` and `'networkidle2'` both map to Playwright's
  `'networkidle'` (arrays collapse to the strongest event).
- CSP bypass, user agent, and the `isMobile`/`hasTouch` viewport flags are
  context-creation options in Playwright, not per-page setters. The driver
  owns one browser context per evaluated page and recreates it when those
  settings change. QualWeb only changes them before navigation, so this is
  transparent; custom plugins should do the same. Plain width/height viewport
  changes (e.g. the ACT reflow rule) work at any time.
- Plugins receive the driver-agnostic page wrapper; `page.nativePage` is a
  Playwright `Page` rather than a Puppeteer one.

# License

ISC
