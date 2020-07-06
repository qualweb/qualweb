import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('QualWeb page', function() {
  it('Testing css rules mapping', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222/', defaultViewport: null });

    const page = await browser.newPage();
    await page.setBypassCSP(true);

    await page.goto('https://act-rules.github.io/testcases/b33eff/c3ff853372ad20009acd217e0fa4f8709d3636bf.html', {
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