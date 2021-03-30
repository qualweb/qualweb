import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    
    const url = 'https://act-rules.github.io/testcases/e086e5/3b4e297ca20e30ab0d1bbf68edd6218a3263ca5d.html';

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true }, "act-rules": { rules: ['QW-ACT-R16'] } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/util.bundle.js')
    });

    await page.evaluate(() => {
      window.qwPage = new Module.QWPage(document, window, true);
      window.DomUtils = Utility.DomUtils;
      window.AccessibilityUtils = Utility.AccessibilityUtils;

      const inputs = window.qwPage.getElements('input');
      for (const input of inputs) {
        window.console.log(window.AccessibilityUtils.getAccessibleName(input));
      }
    });

    //await dom.close();
    //await browser.close();

    expect(true);
  });
});