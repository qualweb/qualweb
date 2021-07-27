import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import locales from '@qualweb/locale';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

describe('Running tests', function () {
  it('Evaluates code', async function () {
    this.timeout(0);

    const html = `
      <html>
        <head>
          <title><span>Hello world</span></title>
        </head
        <body>
          <div>
            <form>
              <span>
                <input id="input" type="checkbox">
              </span>
              <div>
                <label for="input">
                  This is a checkbox
                </label>
              </div>
              <br>
              <label>
                Text input
                <input types="text">
              </label>
              <br>
              <label for="input2">
                This is a number input
              </label>
              <input id="input2" type="number">
              <br>
              <input id="input3" type="radio">
              <label for="input3" style="visibility: hidden;">
                Invisible label
              </label>
              <br>
              <label>
                <input type="text">
              </label>
              <br>
              <label for="input4"></label>
              <div>
                <input id="input4" type="email">
              </div>
            </form>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: false });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process({ execute: { wcag: true }, 'wcag-techniques': { techniques: ['QW-WCAG-T17'] } }, '', html);

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
      const wcag = new WCAGTechniques(
        {
          translate: locale,
          fallback: locale
        },
        {
          techniques: ['QW-WCAG-T17']
        }
      );
      return wcag.execute(false, null);
    }, locales.default.en);

    await page.close();
    await incognito.close();
    await browser.close();

    //console.log(JSON.stringify(report, null, 2));
    expect(report);
  });
});
