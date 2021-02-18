import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('QualWeb counter', function() {
  it('Testing qualweb counter module', async function() {
    this.timeout(60*1000);

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { page } = await dom.getDOM(browser, {}, 'http://127.0.0.1:8080');
    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
    });
    await page.addScriptTag({
      path: require.resolve('../dist/counter.js')
    });
    const report = await page.evaluate(() => {
      const report = Counter.executeCounter(new QWPage.QWPage(document, window, true));
      return report;
    });

    //await dom.close();
    //await browser.close();
  });
});