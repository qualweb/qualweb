import { expect} from 'chai';

import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { Evaluation } from '../dist/index.js';

describe('QualWeb evaluation', function () {
  let browser, incognito, page;

  before(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--ignore-certificate-errors',
        '--no-sandbox',
      ],
    });
    incognito = await browser.createIncognitoBrowserContext();
    page = await incognito.newPage();
  });

  after(async () => {
    await page.close();
    await incognito.close();
    await browser.close();
  });

  it('Testing qualweb page evaluation', async function () {
    this.timeout(0);

    const url = 'https://www.vg.no';

    const dom = new Dom(page);

    const options = {
      waitUntil: ['load', 'networkidle2'],
      //log: { console: true },
      //viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: true, bp: true },
      translate: { translate: locales.default.en, fallback: locales.default.en }
    };

    const { sourceHtmlHeadContent, validation } = await dom.process(options, url, '');

    const evaluation = new Evaluation(url, page, {
      act: true,
      wcag: true,
      bp: false,
      counter: false,
      wappalyzer: false
    });
    const report = (await evaluation.evaluatePage(sourceHtmlHeadContent, options, validation)).getFinalReport();

    expect(report.modules['act-rules']).to.not.be.undefined;
    expect(report.modules['best-practices']).to.be.undefined;
    expect(report.modules.counter).to.be.undefined;
    expect(report.modules.wappalyzer).to.be.undefined;
    expect(report.modules['wcag-techniques']).to.not.be.undefined;

    // console.log(JSON.stringify(report.getFinalReport(), null, 2));
  });
});
