import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
<<<<<<< HEAD:test/url.spec.js
import enLocale from './locales/en.json';
import ptLocale from './locales/pt.json';
=======
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
>>>>>>> develop:test/url.spec.mjs

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://uidai.gov.in/';

    const browser = await puppeteer.launch({
<<<<<<< HEAD:test/url.spec.js
      headless: true,
=======
      headless: false,
>>>>>>> develop:test/url.spec.mjs
      args: ['--ignore-certificate-errors']
    });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process({ execute: { bp: true } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

<<<<<<< HEAD:test/url.spec.js
    const report = await page.evaluate(({ ptLocale, enLocale }) => {
      const bp = new BestPractices({ translate: ptLocale, fallback: enLocale }, { bestPractices: ['QW-BP2'] });
=======
    const report = await page.evaluate(() => {
      const bp = new BestPractices();
>>>>>>> develop:test/url.spec.mjs
      return bp.execute();
    }, { ptLocale, enLocale });

    /*await page.close();
    await incognito.close();
    await browser.close();*/

    console.log(report);
    expect(report);
  });
});
