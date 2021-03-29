import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    
    const url = 'https://ciencias.ulisboa.pt';

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page, validation } = await dom.getDOM(browser, { execute: { wcag: true } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/wcag.bundle.js')
    });

    const report = await page.evaluate((validation) => {
      window.qwPage = new Module.QWPage(document, window, true);
      window.DomUtils = Utility.DomUtils;
      window.AccessibilityUtils = Utility.AccessibilityUtils;
      const wcag = new WCAG.WCAGTechniques(false, validation);
      return wcag.execute();
    }, validation);


    await dom.close();
    await browser.close();

    console.log(report);
    expect(report);
  });
});