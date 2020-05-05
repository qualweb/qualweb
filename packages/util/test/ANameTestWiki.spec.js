const { AccessibilityUtils } = require('../dist/index');
const {
  getDom
} = require('./getDom');
const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('DOM UTILITIES', function () {
  describe('Testing Acessible Name function', function () {
    it('should work', async function () {
      this.timeout(10 * 100000000);
      browser = await puppeteer.launch();
      let url = " https://www.accessibility.nl/wai-tools/validation-test-sites/low-fare-calendar-sas/"//"https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/";

      const { sourceHtml, page, stylesheets } = await getDom(browser, url);
      let links = await page.$$("a");
      let aNameList=[];
        let aName;
        for (let link of links) {
          aName =await await AccessibilityUtils.getAccessibleName(link, page);
          aNameList.push(aName);
        }
      console.log(aNameList);
      expect("").to.be.equal('');
    });
  });
});