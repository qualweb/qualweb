import { Dom } from '@qualweb/dom';
import puppeteer from 'puppeteer';
import { Evaluation } from '../dist/index';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(0);

    const url = 'https://www.pcdiga.com/';

    const browser = await puppeteer.launch();
    const dom = new Dom();
    const { sourceHtml, page ,validation} = await dom.getDOM(browser, {}, url);
    const evaluation = new Evaluation();
    await evaluation.evaluatePage(sourceHtml, page, { act: true, html: true, css: true, bp: true }, {}, url, validation);
    
    await dom.close();
    await browser.close();
  });
});