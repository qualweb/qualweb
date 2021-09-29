import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { Evaluation } from '../dist/index.js';
import fs from 'fs';

describe('QualWeb evaluation', function () {
  it('Testing qualweb page evaluation', async function () {
    this.timeout(0);

    const url = 'https://ciencias.ulisboa.pt ';

    const browser = await puppeteer.launch({ headless: false, args: ['--ignore-certificate-errors'] });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);

    const options = {
      waitUntil: ['load', 'networkidle2'],
      execute: { act: true, wcag: true, bp: true },
      'wcag-techniques': { techniques: ['QW-WCAG-T1'] },
      'act-rules': { rules: ['QW-ACT-R1'] },
      'best-practices': { bestPractices: ['QW-BP1'] },
      translate: { translate: locales.default.fi, fallback: locales.default.en }
    };

    const { sourceHtmlHeadContent, validation } = await dom.process(options, url, '');

    const evaluation = new Evaluation(url, page, {
      act: true,
      wcag: true,
      bp: true,
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
