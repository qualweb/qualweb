import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '../dist/index';
import fs from 'fs';

describe('QualWeb evaluation', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60 * 1000);

    const url = 'https://ciencias.ulisboa.pt'; // 'https://www.cm-proencanova.pt';

    const browser = await puppeteer.launch({ headless: false, args: ['--ignore-certificate-errors'] });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    const { sourceHtmlHeadContent, validation } = await dom.process({ execute: { act: true } }, url, '');
    
    const evaluation = new Evaluation(url, page, { act: true, wcag: false, bp: false, counter: false, wappalyzer: false });
    const report = await evaluation.evaluatePage(sourceHtmlHeadContent, {}, validation);
    
    console.log(report.getFinalReport())
    
    await page.close();
    await incognito.close();
    await browser.close();
  });
});
