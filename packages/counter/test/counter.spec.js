import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('QualWeb counter', function() {
  it('Testing qualweb counter module', async function() {
    this.timeout(60 * 1000);

    const browser = await puppeteer.launch();
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, { execute: { counter: true } }, 'https://ciencias.ulisboa.pt', '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });
    
    await page.addScriptTag({
      path: require.resolve('../dist/counter.bundle.js')
    });

    const report = await page.evaluate(() => {
      window.qwPage = new Module.QWPage(document, window, true);
      window.DomUtils = Utility.DomUtils;
      window.AccessibilityUtils = Utility.AccessibilityUtils;
      return executeCounter();
    });

    console.log(report);

    await dom.close();
    await browser.close();
  });
});