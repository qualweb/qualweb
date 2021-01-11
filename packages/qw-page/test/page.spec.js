import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);

    const browser = await puppeteer.launch({ headless: false });

    const dom = new Dom();
    const { page } = await dom.getDOM(
      browser,
      {},
      'https://act-rules.github.io/testcases/24afc2/74d8b65bddd2568319787ffcf1e80635ddcfaa58.html',
      null
    );

    await page.addScriptTag({
      path: require.resolve('../dist/qwPage.js')
    });

    await page.evaluate(() => {
      // @ts-ignore
      window.page = new QWPage.QWPage(document, window, true);
    });

    await page.evaluate(() => {
      console.log(window.page);
    });

    await page.close();
    await browser.close();
  });
});