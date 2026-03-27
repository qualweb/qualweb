import { expect } from 'chai';
import { createRequire } from 'module';
import { dirname, resolve } from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

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
   
    const injectAndMark = async (modulePath: string) => {
    await page.addScriptTag({ path: require.resolve(modulePath) });
    await page.evaluate(() => {
      const scripts = document.querySelectorAll('script');
      scripts[scripts.length - 1].setAttribute('qw-ignore', '');
    });
  };
    await page.goto(`file://${resolve(__dirname, 'fixtures/loremipsum.html')}`);

   await injectAndMark('@qualweb/qw-page');
   await injectAndMark('@qualweb/util');
    await injectAndMark('../dist/counter.bundle.js');

 

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
    expect(report.data.tags.body).to.equal(1);

    const totalTags = Object.values(report.data.tags).reduce((acc, value) => Number(acc) + Number(value), 0);
    expect(totalTags).to.equal(38);
  });
});