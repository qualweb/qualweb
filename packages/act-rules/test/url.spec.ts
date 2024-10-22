import { expect } from 'chai';
import fetch from 'node-fetch';
import { Browser } from 'puppeteer';
import { launchBrowser } from './util';

describe('URL evaluation', function () {
  let browser: Browser;

  before(async () => (browser = await launchBrowser()));

  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.dgeec.medu.pt/pedidodados';
    const response = await fetch(url);
    const sourceCode = await response.text();

    // FIXME: puppeteer no longer has createIncognitoBrowserContext() - is this a problem?
    const incognito = await browser.createBrowserContext();
    const page = await incognito.newPage();
    await page.goto(url);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/locale')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/act.bundle.js')
    });

    try {
      await page.evaluate(function (sourceHtml) {
        // @ts-expect-error - window.act is not declared as a field on window.
        window.act = new ACTRules({}, 'fi');
        // @ts-expect-error - window.act is not declared as a field on window.
        window.act.configure();
        // @ts-expect-error - window.act is not declared as a field on window.
        window.act.test({ sourceHtml });
      }, sourceCode);
    } catch (_error: unknown) {
      const error = _error as Error;
      console.error(error);
      expect.fail(error.message);
    }

    await page.setViewport({
      width: 640,
      height: 512
    });

    const report = await page.evaluate(() => {
      // @ts-expect-error - window.act is not declared as a field on window.
      window.act.testSpecial();
      // @ts-expect-error - window.act is not declared as a field on window.
      return window.act.getReport();
    });

    expect(report);
  });

  after(async () => {
    await browser.close();
  });
});
