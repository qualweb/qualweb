import { expect} from 'chai';

import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { Evaluation } from '../src';
import type { QualwebOptions } from '@qualweb/core';

describe('QualWeb evaluation', function () {
  let browser: Browser, incognito: BrowserContext, page: Page;

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
    const client = await page.target().createCDPSession();
    await client.send('Network.enable', {
      maxResourceBufferSize: 1024 * 1024 * 200,
      maxTotalBufferSize: 1024 * 1024 * 200    
    });
  });

  after(async () => {
    await page.close();
    await incognito.close();
    await browser.close();
  });

  it('Testing qualweb page evaluation', async function () {
    this.timeout(0);

    const url = 'https://valpacos.pt/';

    const dom = new Dom(page);

    const options: QualwebOptions = {
      waitUntil: ['load', 'networkidle2'],
      //log: { console: true },
      //viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: true, bp: true },
      translate: { translate: locales.en, fallback: locales.en }
    };

    const { sourceHtml, validation } = await dom.process(options, url, '');

    const evaluation = new Evaluation(url, page, {
      act: true,
      wcag: true,
      bp: true,
      counter: false,
      wappalyzer: false
    });
    const report = (await evaluation.evaluatePage(sourceHtml, options, validation)).getFinalReport();

    expect(report.modules['act-rules']).to.not.be.undefined;
    expect(report.modules['best-practices']).to.not.be.undefined;
    expect(report.modules.counter).to.be.undefined;
    expect(report.modules.wappalyzer).to.be.undefined;
    expect(report.modules['wcag-techniques']).to.not.be.undefined;

    console.log(JSON.stringify(report, null, 2));
  });
});
