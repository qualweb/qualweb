const { AccessibilityTreeUtils } = require('../dist/index');
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
      const { sourceHtml, page, stylesheets } = await getDom(browser, "https://www.google.pt");
      let element = await page.$('a');
      expect(await AccessibilityTreeUtils.getElementRole(element)).to.be.equal('link');
    });
    it.only('isElementWidget', async function() {
      AccessibilityTreeUtils.isElementWidget(null);
    });
  });
});