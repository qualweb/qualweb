import puppeteer from 'puppeteer';

/**
 * Sets up a proxy object that will be populated with browser object, incognito
 * context, and page object before a unit test runs.
 * @returns A proxy object that will be populated with a usable browser,
 * incognito context, and page object when a unit test runs.
 */
export function usePuppeteer() {
  const proxy = {
    browser: undefined,
    incognito: undefined,
    page: undefined,
  };

  before(async () => {
    proxy.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--ignore-certificate-errors']
    });

    proxy.incognito = await proxy.browser.createIncognitoBrowserContext();

    proxy.page = await proxy.incognito.newPage();
  })

  after(async () => {
    await proxy.page?.close();
    await proxy.incognito?.close();
    await proxy.browser?.close();
  });

  return proxy;
}