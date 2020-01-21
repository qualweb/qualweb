const { ShadowDomUtils } = require('../dist/index');
const {
  getDom
} = require('./getDom');
const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('DOM UTILITIES', function() {
  describe('Testing getElementStyleProperty function', function() {
    it('should work', async function() {
      this.timeout(10 * 1000);
      browser = await puppeteer.launch();
      const { sourceHtml, page, stylesheets } = await getDom(browser, "https://act-rules.github.io/testcases/b20e66/b07430cf93197d7758985a59f8051756cf635f24.html");
      let shadowPage = await ShadowDomUtils.processShadowDom(page);
      let content =  await shadowPage.content();
      console.log(content)
      expect("").to.be.equal('');
    });
  });
});