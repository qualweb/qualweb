import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { Evaluation } from '../dist/index.js';
import fs from 'fs';

describe('QualWeb evaluation', function () {
  it('Testing qualweb page evaluation', async function () {
    this.timeout(0);

    const url = 'https://ciencias.ulisboa.pt ';

    const browser = await puppeteer.launch({ headless: true, args: ['--ignore-certificate-errors', '--no-sandbox'] });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);

    const options = {
      waitUntil: ['load', 'networkidle2'],
      log: { console: true },
      viewport: { mobile: true, landscape: false },
      execute: { act: true, wcag: false },
      'act-rules': { levels: ['A', 'AA'] },
      translate: { translate: locales.default.en, fallback: locales.default.en }
    };

    const { sourceHtmlHeadContent, validation } = await dom.process(options, url, '');

    const evaluation = new Evaluation(url, page, {
      act: true,
      wcag: false,
      bp: false,
      counter: false,
      wappalyzer: false
    });
    const report = await evaluation.evaluatePage(sourceHtmlHeadContent, options, validation);

    console.log(JSON.stringify(report.getFinalReport(), null, 2));

    await page.close();
    await incognito.close();
    await browser.close();
  });
});
