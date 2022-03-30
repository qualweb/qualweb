import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
import { tests } from './test-pages/QW-WCAG-T34_test.js'
const require = createRequire(import.meta.url);

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(0);
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--ignore-certificate-errors']
    });
    const incognito = await browser.createIncognitoBrowserContext();
    describe('Running tests', function () {
      tests.forEach(function (test) {
        it(test.outcome, async function () {
          this.timeout(0);
          const page = await incognito.newPage();
          const dom = new Dom(page);
          await dom.process({ execute: { wcag: true }, 'wcag-techniques': { techniques: ['QW-WCAG-T34'] } }, '', test.code);

          await page.addScriptTag({
            path: require.resolve('@qualweb/qw-page')
          });

          await page.addScriptTag({
            path: require.resolve('@qualweb/util')
          });

          await page.addScriptTag({
            path: require.resolve('../../dist/wcag.bundle.js')
          });

          const report = await page.evaluate((locale) => {
            const wcag = new WCAGTechniques({ translate: locale, fallback: locale }, { techniques: ['QW-WCAG-T34'] });
            return wcag.execute();
          }, locales.default.en);
          expect(report.assertions['QW-WCAG-T34'].metadata.outcome).to.be.equal(test.outcome);
          /*await page.close();
          await incognito.close();
          await browser.close();*/

        });
      });
    });
  });
});
