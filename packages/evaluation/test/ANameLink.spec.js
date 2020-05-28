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
      const {  page } = await getDom(browser, url);
      await page.addScriptTag({
        path: require.resolve('./accUtil.js')
      })
      await page.addScriptTag({
        path: require.resolve('./domUtil.js')
      })

      //const report = await frames[0].evaluate( await bestPractices.executeHTML);
      const report = await page.evaluate(async () => {

        /*let domUtil = new DomUtilsHTML.DomUtilsHTML();
        let links = document.querySelectorAll("table");
        let aNameList=[];
        let aName;
        for (let link of links) {
          aName =await domUtil.getElementHtmlCode({elementHtml: link}, true,true);
          aNameList.push(aName);
        }
        return aNameList;*/
       const accUtil = new AccessibilityUtils.AccessibilityUtils(new DomUtilsHTML.DomUtilsHTML());
        let links = document.querySelectorAll("a");
        let aNameList=[];
        let aName;
        for (let link of links) {
          aName =await accUtil.getAccessibleName({elementHtml: link}, {document:document});
          aNameList.push(aName);
        }
        return aNameList;
      });
      console.log(report);

      expect("").to.be.equal('');

    });
  });
});
