import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(100 * 1000);
    
    const url = 'http://www.cm-gaviao.pt/pt/turismo/museus/100-turismo/museus/324-museu-do-sabao';

    const browser = await puppeteer.launch({ headless: false });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    const { validation } = await dom.process({ execute: { wcag: true }, "wcag-techniques": { exclude: ['QW-WCAG-T16'] } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/wcag.bundle.js')
    });

    const report = await page.evaluate((validation) => {
      const wcag = new WCAG.WCAGTechniques({
        exclude: ["QW-WCAG-T16"]
      });
      return wcag.execute(false, validation);
    }, validation);


    await page.close();
    await incognito.close();
    await browser.close();

    console.log(report);
    expect(report);
  });
});