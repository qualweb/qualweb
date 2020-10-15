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
    const report = await evaluation.evaluatePage(sourceHtml, page, { act: false, html: false, css: false, bp: false, wappalyzer: true }, {}, url, validation);
    
    await dom.close();
    await browser.close();

    console.log(report);
  });
});