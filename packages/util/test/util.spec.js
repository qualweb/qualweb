const { DomUtils } = require('../dist/index');
const { getDom } = require('@qualweb/get-dom-puppeteer');
const stew = new(require('stew-select')).Stew();
const { expect } = require('chai');

describe('DOM UTILITIES', function() {
  describe('Testing getElementStyleProperty function', function() {
    it('should work', async function() {
      this.timeout(10 * 1000);
      
      const dom = await getDom('https://ciencias.ulisboa.pt');
      const img = stew.select_first(dom.processed.html.parsed, 'img');
      
      expect(DomUtils.getElementStyleProperty(img, 'computed-style', 'width')).to.be.equal('0px');
    });
  });
});