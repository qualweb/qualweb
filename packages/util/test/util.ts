import puppeteer, { Browser, Page } from 'puppeteer';

type PuppeteerProxy = {
  browser: Browser;
  incognito: Awaited<ReturnType<Browser['createIncognitoBrowserContext']>>;
  page: Page;
};

export function usePuppeteer(): PuppeteerProxy {
  const proxy: Partial<PuppeteerProxy> = {
    browser: undefined,
    incognito: undefined,
    page: undefined
  };

  before(async () => {
    proxy.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--ignore-certificate-errors']
    });

    proxy.incognito = await proxy.browser.createIncognitoBrowserContext();

    proxy.page = await proxy.incognito.newPage();
  });

  after(async () => {
    await proxy.page?.close();
    await proxy.incognito?.close();
    await proxy.browser?.close();
  });

  return proxy as PuppeteerProxy;
}
