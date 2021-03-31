import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '../dist/index';
import fs from 'fs';

describe('QualWeb evaluation', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60 * 1000);

    const url = 'https://www.ama.gov.pt/';

    const browser = await puppeteer.launch({ headless: false, args: ['--ignore-certificate-errors'] });
    const dom = new Dom();
    const { sourceHtmlHeadContent, page, validation } = await dom.getDOM(browser, { execute: { act: true } }, url, '');
    
    const evaluation = new Evaluation();
    const report = await evaluation.evaluatePage(sourceHtmlHeadContent, page, { act: true, wcag: false, bp: false, counter: false, wappalyzer: false }, {}, url, validation);
    
    await dom.close();
    await browser.close();
  });
});
