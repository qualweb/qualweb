import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '../dist/index';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60*1000);

    const url = 'https://ciencias.ulisboa.pt';

    const browser = await puppeteer.launch();
    const dom = new Dom();
    const { sourceHtml, page, validation } = await dom.getDOM(browser, {}, url);
    const evaluation = new Evaluation();
    await evaluation.evaluatePage(sourceHtml, page, { act: true,  wcag: true, bp: false }, {}, url,validation);
    await dom.close();
    await browser.close();
  });
});
