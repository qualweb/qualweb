import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    //const url = 'https://act-rules.github.io/testcases/bc659a/cbf6409b0df0b3b6437ab3409af341587b144969.html'
    const url = 'https://ciencias.ulisboa.pt';

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { bp: true } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

    const report = await page.evaluate(() => {
      window.qwPage = new Module.QWPage(document, window, true);
      window.DomUtils = Utility.DomUtils;
      window.AccessibilityUtils = Utility.AccessibilityUtils;
      const bp = new BP.BestPractices();
      return bp.execute();
    });


    await dom.close();
    await browser.close();

    console.log(report);
    expect(report);
  });
});