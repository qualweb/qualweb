import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    const page = await browser.newPage();
    await page.setBypassCSP(true);

    await page.goto('http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test2/', {
      timeout: 0,
      waitUntil: ['networkidle2', 'domcontentloaded']
    });

    await page.addScriptTag({
      path: require.resolve('../dist/qwPage.js')
    });

    await page.evaluate(() => {
      new QWPage.QWPage(document, window, true);
    });
  });
});