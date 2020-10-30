import { Dom } from '@qualweb/dom';
import puppeteer from 'puppeteer';
import { Evaluation } from '../dist/index';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(20 * 1000);

    const url = 'https://www.youtube.com/';

    const browser = await puppeteer.launch({headless:false});
    const dom = new Dom();
    const { sourceHtml, page ,validation} = await dom.getDOM(browser, { viewport: null, execute:{ act: false, html: false, css: false, bp: false }, }, url);
    const evaluation = new Evaluation();
    const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, { act: false, html: false, css: true, bp: false }, {}, url,validation);
    //console.log(evaluationReport);
    await dom.close();
    await browser.close();
  });
});