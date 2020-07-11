import { Dom } from '@qualweb/dom';
import puppeteer from 'puppeteer';
import { Evaluation } from '../dist/index';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(1000 * 1000);

    const url = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test2/';

    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });
    const dom = new Dom();
    const { sourceHtml, page } = await dom.getDOM(browser, { viewport: null }, url);
    const evaluation = new Evaluation();
    const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, { act: true, html: false, css: false, bp: false }, {}, url);
    console.log(evaluationReport);
    await dom.close();
    await browser.close();
  });
});