const { AccessibilityUtils } = require('../dist/index');
const {
  getDom
} = require('./getDom');
const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('DOM UTILITIES', function () {
  describe('Testing Acessible Name function', function () {
    //const result = ["Reset", "States:", "foo David", "crazy", "crazy 4", "fancy fruit", "t", "foo", "foo baz", "crazy", "crazy", "Flash the screen times.", "Flash the screen times.", "My name is Eli the weird. (QED) Where are my marbles?", "Important stuff", "foo bar baz"];
    it('should work', async function () {
      this.timeout(10 * 100000000);
      browser = await puppeteer.launch();
      let url = "https://www.cm-alcobaca.pt/pt/menu/1379/declaracao-de-acessibilidade.aspx";
      const { sourceHtml, page, stylesheets } = await getDom(browser, url);
      let elem = await page.$("svg");
      console.log(elem !== null)
      console.log(await AccessibilityUtils.getAccessibleNameSVG(elem, page));
      expect("").to.be.equal('');

    });
  });
});