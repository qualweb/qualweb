const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('./getDom');
const { ACTRules } = require('../dist/index');

describe('ACT-Rules module', function() {
  it('Should evaluate www.nav.no', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://ciencias.ulisboa.pt');
    
    try {
      const actRules = new ACTRules();
      const report = await actRules.execute(sourceHtml, page, stylesheets);

      console.log(report);
    } catch (err) {
      console.error(err);
    } finally {
      await browser.close();
    }
  })
});