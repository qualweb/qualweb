const { AccessibilityUtils } = require('../dist/index');
const {
  getDom
} = require('./getDom');
const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('DOM UTILITIES', function () {
  describe('Testing Acessible Name function', function () {
    const result = ["Reset", "States:", "foo David", "crazy", "crazy 4", "fancy fruit", "t", "foo", "foo baz", "crazy", "crazy", "Flash the screen times.", "Flash the screen times.", "My name is Eli the weird. (QED) Where are my marbles?", "Important stuff", "foo bar baz"];
    it('should work', async function () {
      this.timeout(10 * 100000000);
      browser = await puppeteer.launch();
      let url = "http://accessible-serv.lasige.di.fc.ul.pt/~aestriga/TestesANV/teste1.html";
      let i = 1;
      while (i <= 16) {
        console.log(url.replace("1", i + ""));
        const { sourceHtml, page, stylesheets } = await getDom(browser, url.replace("1", i + ""));
        let elem = await page.$("#test");
        console.log(elem !== null)
        console.log(await AccessibilityUtils.getAccessibleName(elem, page) + "end");
        console.log(result[i-1]);
        expect("").to.be.equal('');

        i++;
      }


    });
  });
});