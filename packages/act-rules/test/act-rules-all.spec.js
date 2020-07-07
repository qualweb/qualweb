const { expect } = require('chai');
const playwright = require('playwright');
const { getDom } = require('./getDom');
const { ACTRules } = require('../dist/index');
const puppeteer = require('puppeteer');


describe('ACT-Rules module', function () {
  it('Should evaluate', async function () {
    this.timeout(1000 * 1000);
    //['chromium', 'firefox', 'webkit']
    /*const browser = await playwright['chromium'].launch({headless:false});
    const context = await browser.newContext();
    const { sourceHtml, page, stylesheets } = await getDom(context, "https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/");*/

    const browser = await puppeteer.launch({
    });
    const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/');//'https://www.pcdiga.com/'
    
  // const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });
  //https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/
   
    
    try {
     await page.addScriptTag({
        path: require.resolve('../dist/act.js')
      })
      await page.addScriptTag({
        path: require.resolve('@qualweb/qw-page').replace('index.js', 'qwPage.js')
      })
     // sourceHtml.html.parsed = {};
      const report = await page.evaluate(( stylesheets) => {
        const actRules = new ACTRules.ACTRules();
        const report = actRules.execute([], new QWPage.QWPage(document,window,true), stylesheets);
        return report;
      },[]);
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