import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { expect } from 'chai';

describe('Running tests', function () {
  it('Calculates accessible name correctly', async function () {
    this.timeout(100 * 1000);

    const url = 'https://mosaico.gov.pt/o-mosaico';

    const browser = await puppeteer.launch({ headless: false });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process({ execute: { act: true }, waitUntil: ['networkidle0'] }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });
    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate(() => {
      const element = window.qwPage.getElement('html:nth-of-type(1) > body > app-root:nth-of-type(1) > main:nth-of-type(1) > ng-component:nth-of-type(1) > div:nth-of-type(1) > section:nth-of-type(10) > app-topic-link:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > a:nth-of-type(1)');
      window.console.log(element);
      window.console.log(window.AccessibilityUtils.getAccessibleName(element));
    });

    //await dom.close();
    //await browser.close();

    expect(true);
  });
});