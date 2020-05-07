const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('./getDom');
const { ACTRules } = require('../dist/index');

describe('ACT-Rules module', function() {
  it('Should evaluate www.nav.no', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.launch();
    const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://ciencias.ulisboa.pt');
    
    try {
      await page.addScriptTag({
        path: require.resolve('./act.js')
      })
      await page.addScriptTag({
        path: require.resolve('./qwpage.js')
      })
      const report = await page.evaluate(async (sourceHtml,stylesheets) => {

        const actRules = new ACTRules.ACTRules();
      const report = actRules.execute(sourceHtml, new QWPage(document), stylesheets);
        return report;
      },sourceHtml,stylesheets);

     

      console.log(report);
    } catch (err) {
      console.error(err);
    } finally {
      await browser.close();
    }
  })
});