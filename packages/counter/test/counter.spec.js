import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
const { expect } = require('chai');

const URL = 'http://127.0.0.1:8080/testsite.html';



describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60*1000);

    const browser = await puppeteer.launch({headless:false});
    const dom = new Dom();
    const { sourceHtml, page ,validation} = await dom.getDOM(browser, {}, URL);
    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
    });
    await page.addScriptTag({
      path: require.resolve('../dist/counter.js')
    });
    const report = await page.evaluate(() => {
     // const Counter = new Counter.Counter();
     //console.log(Counter);
      const report = Counter.executeCounter(new QWPage.QWPage(document, window, true));
      return report;
    });

    //await dom.close();
    //await browser.close();

    //console.log(evaluationReport);
  });
});