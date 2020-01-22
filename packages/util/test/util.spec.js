const { ShadowDomUtils, DomUtils } = require('../dist/index');
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
    it('test getPageRootElement', async function() {
      this.timeout(1000 * 1000);
      browser = await puppeteer.launch();
      const { sourceHtml, page, stylesheets } = await getDom(browser, "https://act-rules.github.io/testcases/b5c3f8/580a61d57084cdbbe6b27c3dc35d4cc51d078c41.xml");

      const rootElement = await DomUtils.getPageRootElement(page);
      const tagName = await DomUtils.getElementTagName(rootElement);
      console.log(tagName);
      await browser.close();
    });
    it('test isMathDocument', async function() {
      this.timeout(1000 * 1000);
      browser = await puppeteer.launch();
      const { sourceHtml, page, stylesheets } = await getDom(browser, "https://act-rules.github.io/testcases/b5c3f8/580a61d57084cdbbe6b27c3dc35d4cc51d078c41.xml");

      const isMath = await DomUtils.isMathDocument(await page.url());
      console.log(isMath);
      await browser.close();
    });
    it('test enum Optimization', async function() {
      console.log(DomUtils.Optimization);
      console.log(DomUtils.Optimization.Performance === DomUtils.Optimization.ErrorDetection);
      console.log(DomUtils.Optimization.ErrorDetection);
    });
  });
});