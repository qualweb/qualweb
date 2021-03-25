import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '../dist/index';

describe('QualWeb evaluation', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60*1000);

    const url = 'https://ciencias.ulisboa.pt';

    const browser = await puppeteer.launch({ headless: false });
    const dom = new Dom();
    const { sourceHtmlHeadContent, page, validation } = await dom.getDOM(browser, { act: true }, url);
    
    const evaluation = new Evaluation();
    const report = await evaluation.evaluatePage(sourceHtmlHeadContent, page, { act: true }, {}, url, validation);
    console.log(report.getFinalReport());
    //await dom.close();
    //await browser.close();
  });
});
