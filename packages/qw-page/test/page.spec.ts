import puppeteer from 'puppeteer';
import { expect } from 'chai';
import { QualWeb } from '@qualweb/core';

describe('QualWeb page', function () {
  it('Testing qw-page injection on browser', async function () {
    this.timeout(0);

    const browser = await puppeteer.launch({ headless: 'new' });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();

    const qwPage = QualWeb.createPage(page);
    await qwPage.process({ execute: {} }, 'https://www.aalborg.dk', '');

    await page.addScriptTag({ path: require.resolve('../dist/qw-page.bundle.js') });

    expect(await page.evaluate(() => window.qwPage));

    await page.close();
    await incognito.close();
    await browser.close();
  });
});
