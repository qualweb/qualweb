import { Dom } from '@qualweb/dom';
import puppeteer from 'puppeteer';
import { Evaluation } from '../dist/index';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(1000 * 1000);

    const url = 'https://www.pcdiga.com/';

    const browser = await puppeteer.launch();
    const dom = new Dom();
    const { sourceHtml, page } = await dom.getDOM(browser, { viewport: null }, url);
    const evaluation = new Evaluation();
    const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, { act: true, html: true, css: false, bp: false }, {}, url);
    //console.log(evaluationReport);
    await dom.close();
    await browser.close();
  });
});