// Can't import code that's meant for the browser (?)
// import { AccessibilityUtils , DomUtils, Optimization } from '../dist/index';
import CSSselect from 'css-select';
import { expect } from 'chai';
import { Dom } from '@qualweb/dom';
import { usePuppeteer } from './util';

describe('util.spec.mjs', () => {
  const proxy = usePuppeteer();

  it('should work', async function() {
    this.timeout(10 * 1000);

    const { page } = proxy;

    const dom = new Dom(page);
    await dom.process({}, 'https://act-rules.github.io/testcases/b20e66/f8bd8641691aa2916a2faa639fabb479d3baa54f.html');
    let svg = await page.$('svg');
    let children;
    if(svg!== null)
    children = await DomUtils.getElementChildren(svg);

    for(let elemt of children){
      console.log(await DomUtils.getElementTagName(elemt))
      console.log(await AccessibilityTreeUtils.getAccessibleNameSVG(elemt,page))
    }
    
    expect('').to.be.equal('');
  });

  it('test getPageRootElement', async function() {
    this.timeout(1000 * 1000);
    
    const { page } = proxy;

    const dom = new Dom(page);
    await dom.process({}, 'https://act-rules.github.io/testcases/b5c3f8/580a61d57084cdbbe6b27c3dc35d4cc51d078c41.xml');

    const rootElement = await DomUtils.getPageRootElement(page);
    const tagName = await DomUtils.getElementTagName(rootElement);

    // console.log(tagName);
  });
  it('test isMathDocument', async function() {
    this.timeout(1000 * 1000);
    
    const { page } = proxy;

    const dom = new Dom(page);
    await dom.process({}, 'https://act-rules.github.io/testcases/b5c3f8/580a61d57084cdbbe6b27c3dc35d4cc51d078c41.xml');

    const isMath = await DomUtils.isMathDocument(await page.url());
    
    console.log(isMath);
  });

  // Bad unit tests?
  // it('test enum Optimization', async function() {
  //   console.log(Optimization);
  //   console.log(Optimization.Performance === Optimization.ErrorDetection);
  //   console.log(Optimization.ErrorDetection);
  // });

  // it('print namespace', async function() {
  //   console.log(AccessibilityUtils);
  // });

  it('getSourceElementHtmlCode', async function() {
    this.timeout(100 * 1000);
    
    const { page } = proxy;

    const dom = new Dom(page);
    const { sourceHtml } = await dom.process({}, 'https://nav.no');
    const metas = CSSselect('meta', sourceHtml.html.parsed);
    const html = DomUtils.getSourceElementHtmlCode(metas[0]);
    
    // console.log(html);
  });
});