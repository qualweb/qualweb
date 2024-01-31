import puppeteer from 'puppeteer';

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