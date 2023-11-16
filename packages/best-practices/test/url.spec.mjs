import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.ccb.pt/';

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--ignore-certificate-errors']
    });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process({ execute: { bp: false } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

    const report = await page.evaluate((locale) => {
      const bp = new BestPractices({ translate: locale, fallback: locale }, { bestPractices: ['QW-BP18'] });
      return bp.execute();
    }, locales.default.en);

    /*await page.close();
    await incognito.close();
    await browser.close();*/

    console.log(JSON.stringify(report, null, 2));
    expect(report);
  });
});
