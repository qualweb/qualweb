import { Dom } from '../dist/index.js';
import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('HTML validation', function () {
  it('should be undefined', async function () {
    this.timeout(0);
    const browser = await puppeteer.launch({ headless: true });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    const { validation } = await dom.process({}, 'https://ciencias.ulisboa.pt', '');

    await page.close();
    await incognito.close();
    await browser.close();

    expect(validation).to.be.undefined;
  });
  it('should not be undefined', async function () {
    this.timeout(0);
    const browser = await puppeteer.launch({ headless: true });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page /** INSERT ENDPOINT HERE **/);
    const { validation } = await dom.process({ execute: { wcag: true } }, 'https://ciencias.ulisboa.pt', '');

    await page.close();
    await incognito.close();
    await browser.close();

    expect(validation).to.not.be.undefined;
  });
});
