---
"@qualweb/core": minor
"@qualweb/crawler": minor
---

Extract the browser-automation coupling behind driver interfaces (Driver,
DriverPool, DriverPage, DriverContext), with Puppeteer remaining the default
driver and behavior unchanged. Alternative drivers can be passed to the
QualWeb constructor. Breaking for plugin authors: QualwebPlugin callbacks now
receive the driver-agnostic page wrapper; the raw Puppeteer page is available
as `page.nativePage`. `QualwebOptions.waitUntil` is now typed with a
QualWeb-owned `LoadEvent` union (same literal values as before);
`PuppeteerLifeCycleEvent` remains as a deprecated alias. @qualweb/crawler no
longer references Puppeteer types: its constructor accepts any page source,
including Puppeteer Browser/BrowserContext objects as before.
