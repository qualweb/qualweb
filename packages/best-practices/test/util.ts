import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';

type PuppeteerProxy = {
  browser: Browser;
  incognito: BrowserContext;
  page: Page;
}

export function usePuppeteer(): PuppeteerProxy {
  const proxy: Partial<PuppeteerProxy> = {
    browser: undefined,
    incognito: undefined,
    page: undefined,
  };

  before(async () => {
    proxy.browser = await puppeteer.launch({
      headless: true,
      args: ['--ignore-certificate-errors']
    });

    // TODO: createIncognitoBrowserContext() is no longer avilable. Is this a problem?
    proxy.incognito = await proxy.browser.createBrowserContext();

    proxy.page = await proxy.incognito.newPage();
  })

  after(async () => {
    await proxy.page?.close();
    await proxy.incognito?.close();
    await proxy.browser?.close();
  });

  return proxy as PuppeteerProxy;
}