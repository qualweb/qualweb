import { Dom } from '@qualweb/dom';
import puppeteer from 'puppeteer';
import { Evaluation } from '../dist/index';

describe('QualWeb page', function() {
  it('Testing qualweb page evaluation', async function() {
    this.timeout(60*1000);

    const url = 'http://www.appacdm-elvas.org ';

    const browser = await puppeteer.launch();
    const dom = new Dom();
    const { sourceHtml, page ,validation} = await dom.getDOM(browser, {}, url);
    const evaluation = new Evaluation();
    const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, { act: false,  wcag: true, bp: false }, {}, url,validation);
    //console.log(evaluationReport);
    await dom.close();
    await browser.close();

    //console.log(evaluationReport);
  });
});

//http://www.apce.org.pt/
//http://www.cm-caldas-rainha.pt/