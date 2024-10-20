import { expect } from 'chai';
import { resolve } from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';

describe('QualWeb counter', async () => {
  let browser: Browser;
  let page: Page;

  before(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
  });

  after(async () => {
    await page.close();
    await browser.close();
  })

  it('Testing qualweb counter module', async function() {
    this.timeout(60 * 1000);

    await page.goto(`file://${resolve(__dirname, 'fixtures/loremipsum.html')}`);

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
      // @ts-expect-error: the function will be available within the context (injected bundle).
      return executeCounter();
    });

    // These expectations are mapped directly to the fixture file loremipsum.html

    expect(report.type).to.equal('counter');
    expect(report.data.roles.document).to.equal(1);
    expect(report.data.roles.generic).to.equal(9);

    expect(report.data.tags.html).to.equal(1);
    expect(report.data.tags.head).to.equal(1);
    expect(report.data.tags.script).to.equal(3);
    expect(report.data.tags.body).to.equal(1);
  });
});