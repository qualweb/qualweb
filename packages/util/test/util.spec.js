import { AccessibilityUtils , DomUtils, Optimization } from '../dist/index';
import puppeteer from 'puppeteer';
import CSSselect from 'css-select';
import { expect } from 'chai';

describe('DOM UTILITIES', function() {
  describe('Testing getElementStyleProperty function', function() {
    it('should work', async function() {
      this.timeout(10 * 1000);
      const browser = await puppeteer.launch();
      const dom = new Dom();
      const { page } = await dom.getDOM(browser, 'https://act-rules.github.io/testcases/b20e66/f8bd8641691aa2916a2faa639fabb479d3baa54f.html');
      let svg = await page.$('svg');
      let children;
      if(svg!== null)
      children = await DomUtils.getElementChildren(svg);

      for(let elemt of children){
        console.log(await DomUtils.getElementTagName(elemt))
        console.log(await AccessibilityTreeUtils.getAccessibleNameSVG(elemt,page))
      }
      await browser.close();
      
      expect('').to.be.equal('');
    });
    it('test getPageRootElement', async function() {
      this.timeout(1000 * 1000);
      browser = await puppeteer.launch();
      const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://act-rules.github.io/testcases/b5c3f8/580a61d57084cdbbe6b27c3dc35d4cc51d078c41.xml');

      const rootElement = await DomUtils.getPageRootElement(page);
      const tagName = await DomUtils.getElementTagName(rootElement);
      console.log(tagName);
      await browser.close();
    });
    it('test isMathDocument', async function() {
      this.timeout(1000 * 1000);
      browser = await puppeteer.launch();
      const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://act-rules.github.io/testcases/b5c3f8/580a61d57084cdbbe6b27c3dc35d4cc51d078c41.xml');

      const isMath = await DomUtils.isMathDocument(await page.url());
      console.log(isMath);
      await browser.close();
    });
    it('test enum Optimization', async function() {
      console.log(Optimization);
      console.log(Optimization.Performance === Optimization.ErrorDetection);
      console.log(Optimization.ErrorDetection);
    });
    it('print namespace', async function() {
      console.log(AccessibilityUtils);
    });
    it.only('getSourceElementHtmlCode', async function() {
      this.timeout(100 * 1000);
      browser = await puppeteer.launch();
      const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://nav.no');
      const metas = CSSselect('meta', sourceHtml.html.parsed);
      const html = DomUtils.getSourceElementHtmlCode(metas[0]);
      console.log(html);
      await browser.close();
    });
  });
});