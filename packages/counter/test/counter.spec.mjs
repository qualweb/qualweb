import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

import { expect } from 'chai';

import puppeteer from 'puppeteer';

import { Dom } from '@qualweb/dom';

const require = createRequire(import.meta.url);

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('QualWeb counter', async () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
    await browser.close();
  })

  it('Testing qualweb counter module', async function() {
    this.timeout(60 * 1000);

    const html = readFileSync(resolve(__dirname, 'fixtures/loremipsum.html'));

    const dom = new Dom(page);
    await dom.process({ execute: { counter: true } }, '', html);

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });
    
    await page.addScriptTag({
      path: require.resolve('../dist/counter.bundle.js')
    });

    const report = await page.evaluate(() => {
      return executeCounter();
    });

    // These expectations are mapped directly to the fixture file loremipsum.html

    expect(report.type).to.equal('counter');
    expect(report.data.roles.document).to.equal(1);
    expect(report.data.roles.generic).to.equal(1);

    expect(report.data.tags.html).to.equal(1);
    expect(report.data.tags.head).to.equal(1);
    expect(report.data.tags.script).to.equal(3);
    expect(report.data.tags.body).to.equal(1);
  });
});