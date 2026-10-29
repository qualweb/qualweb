# QualWeb Puppeteer driver

Optional legacy-backend support for applications that still need Puppeteer page
APIs. This package is not a dependency of core or the CLI. It uses maintained
Puppeteer and puppeteer-cluster, without Puppeteer-extra, stealth, or adblock
plugins. It does not preserve the old plugin stack.

Requires Node.js 22.12 or newer. Installing this package normally downloads
Puppeteer's browser. Set `PUPPETEER_SKIP_DOWNLOAD=true` to skip that download and
supply an existing compatible Chromium `executablePath` instead.

```sh
npm install @qualweb/core @qualweb/puppeteer-driver
```

```typescript
import { QualWeb } from '@qualweb/core';
import { PuppeteerDriver } from '@qualweb/puppeteer-driver';

const qualweb = new QualWeb(undefined, new PuppeteerDriver({
  launchOptions: { headless: true },
}));
await qualweb.start({ maxConcurrency: 4 });
try {
  const reports = await qualweb.evaluate({ url, modules });
} finally {
  await qualweb.stop();
}
```

Configure Puppeteer launch options on the driver, not `QualWeb.start()`.
Driver-specific plugin APIs use `page.nativePage` as a Puppeteer `Page`.
To wrap an existing Puppeteer page for QualWeb's testing helper, use
`QualWeb.createPage(new PuppeteerDriverPage(page))`.
