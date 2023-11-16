import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';

describe('QualWeb page', function () {
  it('Testing qw-page injection on browser', async function () {
    this.timeout(0);

    const browser = await puppeteer.launch();
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();

    const dom = new Dom(page);
    await dom.process({ execute: {} }, 'https://ciencias.ulisboa.pt', '');

    await page.addScriptTag({
      path: import.meta.resolve('../dist/qw-page.bundle.js')
    });

    await page.evaluate(() => {
      window.qwPage = new QWPage(document, window, true);
    });

    await page.close();
    await incognito.close();
    await browser.close();
  });
});
