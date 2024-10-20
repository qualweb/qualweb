import { expect } from 'chai';
import fetch from 'node-fetch';
import { Browser } from 'puppeteer';
import { launchBrowser } from './util';
import { ACTRules } from '../src/index';

declare global {
  interface Window {
    act: ACTRules;
  }
}

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

    await page.evaluate((sourceHtml) => {
      //@ts-expect-error the object ACTRules is defined inside the page
      window.act = new ACTRules('fi');
      window.act.test({ sourceHtml });
    }, sourceCode);

    await page.setViewport({
      width: 640,
      height: 512
    });

    const report = await page.evaluate(() => {
      window.act.testSpecial();
      return window.act.getReport();
    });

    // console.log(JSON.stringify(report, null, 2));
    expect(report);
  });

  after(async () => {
    await browser.close();
  });
});
