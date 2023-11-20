import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { expect } from 'chai';

describe('Running tests', function () {
  it('Calculates accessible name correctly', async function () {
    this.timeout(100 * 1000);
    
    const url = 'https://act-rules.github.io/testcases/674b10/9ba09fb345e5e4fae83776a55049957281def46e.html';

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { act: true }, "act-rules": { rules: ['QW-ACT-R20'] } }, url, '');

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

      const elements = window.qwPage.getElements('[role]');
      for (const elem of elements) {
        window.console.log(window.AccessibilityUtils.elementHasValidRole(elem));
      }
    });

    //await dom.close();
    //await browser.close();

    expect(true);
  });
});