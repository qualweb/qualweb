import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { expect } from 'chai';

import { Dom } from '../dist/index.js';
import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';

describe('dom.process()', () => {
  let browser: Browser;
  let incognito: BrowserContext;
  let page: Page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
    });
    incognito = await browser.createIncognitoBrowserContext();
    page = await incognito.newPage();
  });

  afterEach(async () => {
    await page.close();
    await incognito.close();
    await browser.close();
  })

  it('No ACT/WCAG execution intent should not yield validation', async function () {
    this.timeout(0);
    
    const emptyHtmlFile = readFileSync(resolve(__dirname, 'fixtures/empty.html'), 'utf-8');

    const dom = new Dom(page);

    const { validation } = await dom.process({}, '', emptyHtmlFile);

    expect(validation).to.be.undefined;
  });
  it('ACT/WCAG execution intent must yield validation', async function () {
    this.timeout(0);

    const emptyHtmlFile = readFileSync(resolve(__dirname, 'fixtures/empty.html'), 'utf-8');

    const dom = new Dom(page, /** MISSING VALIDATOR HERE! */);

    const { validation } = await dom.process({ execute: { wcag: true } }, '', emptyHtmlFile);

    console.debug(validation);

    expect(validation).to.not.be.undefined;
  });
});
