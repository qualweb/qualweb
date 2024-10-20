import puppeteer from 'puppeteer';
import { expect } from 'chai';
import type { QWPage } from '../src';

declare global {
  interface Window {
    qwPage: QWPage;
  }
}

describe('QualWeb page', function () {
  it('Testing qw-page injection on browser', async function () {
    this.timeout(0);

    const browser = await puppeteer.launch({ headless: true });
    // createIncognitoBrowserContext() is deprecated - is the incognito mode necessary?
    const incognito = await browser.createBrowserContext();
    const page = await incognito.newPage();

    await page.addScriptTag({ path: require.resolve('../dist/qw-page.bundle.js') });

    expect(await page.evaluate(() => window.qwPage));

    await page.close();
    await incognito.close();
    await browser.close();
  });
});
