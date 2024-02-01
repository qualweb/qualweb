import { createRequire } from 'module';

import { Dom } from '@qualweb/dom';
import puppeteer from 'puppeteer';

const require = createRequire(import.meta.url);

describe('QualWeb counter', async () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
    try {
      await page.close();
    } catch (err) {
      // Why err?
    }
  })

  it('Testing qualweb counter module', async function() {
    this.timeout(60 * 1000);

    const dom = new Dom(page);
    await dom.process({ execute: { counter: true } }, 'https://ciencias.ulisboa.pt', '');

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
      // Unnecessary? the modules seems to do this on load.
      // window.qwPage = new Module.QWPage(document, window, true);
      // window.DomUtils = Utility.DomUtils;
      // window.AccessibilityUtils = Utility.AccessibilityUtils;
      return executeCounter();
    });

    console.debug(report);
  });
});