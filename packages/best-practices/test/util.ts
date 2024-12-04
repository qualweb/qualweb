import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';

type PuppeteerProxy = {
  browser: Browser;
  browserContext: BrowserContext;
  page: Page;
}

export function usePuppeteer(): PuppeteerProxy {
  const proxy: Partial<PuppeteerProxy> = {
    browser: undefined,
    browserContext: undefined,
    page: undefined,
  };

  before(async () => {
    proxy.browser = await puppeteer.launch({
      headless: true,
      args: ['--ignore-certificate-errors']
    });

    // TODO: createIncognitoBrowserContext() is no longer avilable. Is this a problem?
    proxy.browserContext = await proxy.browser.createBrowserContext();

    proxy.page = await proxy.browserContext.newPage();
  })

  after(async () => {
    await proxy.page?.close();
    await proxy.browserContext?.close();
    await proxy.browser?.close();
  });

  return proxy as PuppeteerProxy;
}