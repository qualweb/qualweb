import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(0);

    const url = 'https://www.apec.org.pt/'; // 'https://ciencias.ulisboa.pt/';

    const browser = await puppeteer.launch({ headless: false });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process(
      {
        execute: { wcag: true },
        'wcag-techniques': { techniques: ['QW-WCAG-T9'] }
      },
      url,
      ''
    );

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/wcag.bundle.js')
    });
    await new Promise(r => setTimeout(r, 2000));

    const report = await page.evaluate((locale) => {
      const wcag = new WCAGTechniques(
        {
          translate: locale,
          fallback: locale
        },
        {
          techniques: ['QW-WCAG-T9']
        }
      );
      return wcag.execute(false, undefined);
    }, locales.default.en);

   /* await page.close();
    await incognito.close();
    await browser.close();*/

    console.log(JSON.stringify(report, null, 2));
    expect(report);
  });
});
