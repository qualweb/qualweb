import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '../dist/index';

describe('QualWeb evaluation', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60*1000);

    const url = 'http://app-bleauborgerumb-dev-001.azurewebsites.net/';

    const browser = await puppeteer.launch({headless: false});
    const dom = new Dom();
    const { sourceHtml, page, validation } = await dom.getDOM(browser, { act: true }, url);
    console.log(validation)
    const evaluation = new Evaluation();
    const report = await evaluation.evaluatePage(sourceHtml, page, { act: true }, { "act-rules": { rules: ["QW-ACT-R72"] }}, url, validation);
    console.log(JSON.stringify(report.getFinalReport().modules['act-rules'], null, 2));
    //await dom.close();
    //await browser.close();
  });
});
