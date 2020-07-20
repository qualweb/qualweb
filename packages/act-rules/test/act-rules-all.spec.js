const { expect } = require('chai');
const playwright = require('playwright');
const { getDom } = require('./getDom');
const { ACTRules } = require('../dist/index');
const puppeteer = require('puppeteer');
const { Dom } = require('@qualweb/dom');



describe('ACT-Rules module', function () {
  it('Should evaluate', async function () {
    this.timeout(1000 * 10000);
    //['chromium', 'firefox', 'webkit']
    const browser = await playwright['chromium'].launch({headless:false});
    const context = await browser.newContext({bypassCSP:true});
    const { sourceHtml, page, stylesheets } = await getDom(context, "https://act-rules.github.io/testcases/9eb3f6/cfd1636ab41c1418d1ad510eb9802c31fb2c5c5e.html");

    /*  const browser = await puppeteer.launch({
      });
      const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/');//'https://www.pcdiga.com/'
      */
    // const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });
    //https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/
   /* const browser = await puppeteer.launch({headless:false});
    const dom = new Dom();
    const { sourceHtml, page, stylesheets } = await dom.getDOM(browser, {}, " https://www.metrolisboa.pt/en/", null);*/

    try {
      await page.addScriptTag({
        path: require.resolve('../dist/act.js')
      })
      await page.addScriptTag({
        path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
      })

      // sourceHtml.html.parsed = {};
      console.log("Evaluating")
      const report = await page.evaluate((stylesheets) => {
        const actRules = new ACTRules.ACTRules();
        const report = actRules.execute([], new QWPage.QWPage(document, window, true), stylesheets);
        return report;
      }, []);
      const fs = require('fs')
      // Write data in 'Output.txt' . 
      fs.writeFile('Output.txt', JSON.stringify(report, null, 2), (err) => {
        // In case of a error throw err. 
        if (err) throw err;
      })
    } catch (err) {
      console.error(err);
    } finally {
      //await browser.close();
    }
  })
});