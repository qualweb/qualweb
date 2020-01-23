const { AccessibilityTreeUtils ,DomUtils} = require('../dist/index');
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
      const { sourceHtml, page, stylesheets } = await getDom(browser, "https://act-rules.github.io/testcases/b20e66/f8bd8641691aa2916a2faa639fabb479d3baa54f.html");
      let svg = await page.$("svg");
      let children;
      if(svg!== null)
      children = await DomUtils.getElementChildren(svg);

      for(let elemt of children){
        console.log(await DomUtils.getElementTagName(elemt))
        console.log(await AccessibilityTreeUtils.getAccessibleNameSVG(elemt,page))
      }
  
      expect("").to.be.equal('');
    });
  });
});