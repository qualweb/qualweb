import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { Evaluation } from '../dist/index';

describe('QualWeb evaluation', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60 * 1000);

    const url = 'https://ciencias.ulisboa.pt';

    const browser = await puppeteer.launch({ headless: true, args: ['--ignore-certificate-errors'] });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    const { sourceHtmlHeadContent, validation } = await dom.process({ execute: { act: true }, "act-rules": { rules: ['QW-ACT-R1', 'QW-ACT-R2'] } }, url, '');
    
    const evaluation = new Evaluation(url, page, { act: true, wcag: false, bp: false, counter: false, wappalyzer: false });
    const report = await evaluation.evaluatePage(sourceHtmlHeadContent, { translate: { translate: locales.pt, fallback: locales.en } }, validation);
    
    console.log(report.getFinalReport().modules['act-rules'].assertions['QW-ACT-R1']);
    console.log(report.getFinalReport().modules['act-rules'].assertions['QW-ACT-R2']);
    
    await page.close();
    await incognito.close();
    await browser.close();
  });
});
